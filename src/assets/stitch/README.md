# Stitch assets — download & mapping

Purpose
- Provide a reproducible, auditable method to extract asset URLs from a Google Stitch JSON export and download each referenced asset into this directory (src/assets/stitch/) preserving the original filename.
- The export JSON is the Stitch project export (download from Stitch UI → Export). Place the export file next to this README and follow the steps below.

Quick example (what this will produce)
- After running the script, this directory will contain files like:
  - hero-image.png  (from: https://assets.stitch.withgoogle.com/PROJECTID/abcd1234/hero-image.png)
  - illustration-1.svg  (from: https://assets.stitch.withgoogle.com/PROJECTID/efgh5678/illustration-1.svg)
- assets-mapping.txt will contain lines in the exact format:
  - hero-image.png https://assets.stitch.withgoogle.com/PROJECTID/abcd1234/hero-image.png

Important
- Execution will download remote files. Inspect URLs before running. Use a CI agent or local environment that you trust.
- Tools required: jq (>=1.5), curl (or wget), sha256sum (optional).
- This README implements a robust, generic extraction (searches for common URL keys) so explicit asset URL listing is not required here.

What this directory will contain after running the script
- All referenced asset files downloaded from the Stitch export, kept with their original basename (query strings removed).
- A text mapping file assets-mapping.txt containing lines: <filename> <source-url>
- Example mapping entry (illustrative):
  - hero-image.png  https://assets.stitch.withgoogle.com/PROJECTID/abcd1234/hero-image.png

Step 1 — put your Stitch export JSON here
- Save the Stitch export JSON file as stitch-export.json in this directory:
  - src/assets/stitch/stitch-export.json

Step 2 — download script (copy & run)
- Create a script named download-assets.sh in this directory with the content below, mark it executable, then run it.
- The script:
  - Parses stitch-export.json for any https? URL fields (common keys: url, assetUrl, src, file).
  - Deduplicates URLs.
  - Downloads each URL into this directory preserving the original filename (removes query string).
  - Emits assets-mapping.txt and a summary.

Script content (copy into src/assets/stitch/download-assets.sh)
```bash
#!/usr/bin/env bash
set -euo pipefail

# Constants
WORKDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXPORT_JSON="$WORKDIR/stitch-export.json"
OUT_DIR="$WORKDIR"
MAPPING_FILE="$WORKDIR/assets-mapping.txt"
TMP_URLS="$WORKDIR/.stitch-asset-urls.tmp"

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: 'jq' is required but not installed. Install jq and retry." >&2
  exit 2
fi
if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: 'curl' is required but not installed. Install curl and retry." >&2
  exit 2
fi

if [ ! -f "$EXPORT_JSON" ]; then
  echo "ERROR: Stitch export JSON not found at: $EXPORT_JSON" >&2
  echo "Place the Stitch export file here and name it 'stitch-export.json'." >&2
  exit 3
fi

# Extract candidate URL fields from the export. This filter is conservative:
# - Walk the JSON tree (..), select objects, then test a set of common fields.
# - Fallback: search any string value that looks like an http(s) URL.
jq -r '
  (.. | objects
    | .url? // .assetUrl? // .src? // .file? // .source? // empty
  ),
  (.. | scalars | select(type=="string") | select(test("https?://")))
' "$EXPORT_JSON" \
  | sed -E "s/^[[:space:]]+|[[:space:]]+$//g" \
  | grep -E '^https?://' \
  | sort -u > "$TMP_URLS"

if [ ! -s "$TMP_URLS" ]; then
  echo "No asset URLs were discovered in $EXPORT_JSON." >&2
  echo "Inspect the export file or adjust the jq extraction logic." >&2
  rm -f "$TMP_URLS"
  exit 4
fi

# Prepare mapping file
: > "$MAPPING_FILE"
echo "# Generated on $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$MAPPING_FILE"
echo "# Format: <filename> <source-url>" >> "$MAPPING_FILE"
echo "" >> "$MAPPING_FILE"

# Download loop
while IFS= read -r url; do
  # Normalize: strip query string and fragment to get a stable filename
  basename="$(basename "${url%%[\?#]*}")"
  # Avoid empty or dot filenames
  if [ -z "$basename" ] || [ "$basename" = "/" ] || [ "$basename" = "." ]; then
    # Generate a deterministic name from sha256 of the URL
    if command -v sha256sum >/dev/null 2>&1; then
      hash="$(printf '%s' "$url" | sha256sum | awk '{print $1}')"
    else
      # fallback to md5 if sha256sum isn't available
      hash="$(printf '%s' "$url" | md5sum | awk '{print $1}')"
    fi
    basename="asset-$hash"
  fi
  target="$OUT_DIR/$basename"
  # Skip if file already exists and is non-empty
  if [ -s "$target" ]; then
    echo "Skipping existing: $basename"
  else
    echo "Downloading: $url -> $basename"
    # Use curl with retry and fail flags
    if ! curl --fail --location --retry 3 --max-time 120 -o "$target" "$url"; then
      echo "WARNING: failed to download $url; removing partial file and continuing" >&2
      rm -f "$target"
      continue
    fi
  fi
  # Record mapping (append)
  echo "$basename $url" >> "$MAPPING_FILE"
done < "$TMP_URLS"

# Summary
echo ""
echo "Download complete. Mapping written to: $MAPPING_FILE"
echo "Files in $OUT_DIR:"
ls -1 "$OUT_DIR" | sed -n '1,200p'
rm -f "$TMP_URLS"
exit 0
```

Step 3 — run the script
- Make executable and run:
  - chmod +x download-assets.sh
  - ./download-assets.sh
- The script will produce assets-mapping.txt and the downloaded files.

Step 4 — verify assets (optional)
- Optional SHA256 verification if your Stitch export includes checksums.
- Example: if the export JSON contains an object with "url" and "sha256" keys, a small jq snippet can produce filename + expected checksum and you can compare with sha256sum.
- Simple local check (for each mapping line):
  - sha256sum -c <(awk '{print $2 "  " $1}' assets-mapping-with-sha.txt)
  - (This requires generating assets-mapping-with-sha.txt where left column is checksum, right column is filename.)

Generating an explicit filename→URL mapping file
- assets-mapping.txt lists each downloaded filename and the source URL.
- If you want a CSV:
  - awk '{printf "\"%s\",\"%s\"\n", $1, $2}' assets-mapping.txt > assets-mapping.csv

Example (illustrative)
- hero-image.png  https://assets.stitch.withgoogle.com/PROJECTID/abcd1234/hero-image.png
- illustration-1.svg  https://assets.stitch.withgoogle.com/PROJECTID/efgh5678/illustration-1.svg

Security notes
- Validate URLs before running in an untrusted environment.
- Do not run the script as root. Prefer a dedicated CI user.
- If curl fails due to TLS issues in restricted CI, ensure CA certs are available.
- Large assets: script downloads files into the repo. Keep size limits in mind for pushes; consider storing large assets in LFS if required.

PowerShell (Windows) alternative
- The following PowerShell pipeline extracts URLs from the export and downloads them (example skeleton; adapt for production):
```powershell
$export = "stitch-export.json"
$json = Get-Content $export -Raw | ConvertFrom-Json
# Heuristic: find string values matching http(s) in the JSON text
$urls = ([regex]::Matches((Get-Content $export -Raw), 'https?://[^\s"\'\)\],]+') | ForEach-Object { $_.Value }) | Sort-Object -Unique
foreach ($url in $urls) {
  $uri = [uri]$url
  $filename = [System.IO.Path]::GetFileName($uri.AbsolutePath)
  if ([string]::IsNullOrEmpty($filename)) { $filename = "asset-$([guid]::NewGuid().ToString())" }
  Invoke-WebRequest -Uri $url -OutFile (Join-Path -Path $PSScriptRoot -ChildPath $filename) -UseBasicParsing -ErrorAction SilentlyContinue
}
```

Why this approach
- Stitch exports vary; asset references may be nested under many keys. The jq-based approach finds common fields and any string that looks like a URL, then deduplicates and downloads, giving a complete, repeatable process without manually enumerating assets.

If you want to include an explicit, hand-curated mapping
- Create a file named assets-mapping-manual.txt with one mapping per line:
  - hero-image.png https://assets.stitch.withgoogle.com/PROJECTID/abcd1234/hero-image.png
  - illustration-1.svg https://assets.stitch.withgoogle.com/PROJECTID/efgh5678/illustration-1.svg
- The download script can be adapted to prefer URLs from that file if present.

CI / automation notes
- If you plan to run this in CI and commit generated assets:
  - Ensure the repo accepts the resulting file sizes (or use LFS).
  - Consider gating the download with a manual job or a protected variable so assets are only fetched by authorized CI runs.
  - Always include assets-mapping.txt in the commit so reviewers can audit sources.

Troubleshooting
- If you receive TLS errors: ensure CA certificates are present in the environment (ca-certificates package on Debian/Ubuntu).
- If jq extraction misses URLs: open stitch-export.json and search for "url", "asset", "src", "file", "assetUrl" or other keys and adjust the jq expression at the top of the script.
- If many false positives are present (e.g., analytics or external CDN links not needed), create assets-mapping-manual.txt and control the list explicitly.

Checklist before committing downloaded assets
- [ ] Confirm all filenames referenced in the React components exist in this directory
- [ ] assets-mapping.txt contains the corresponding source URL for each file
- [ ] File sizes are acceptable for the repository; use LFS if necessary
- [ ] No sensitive or private URLs were inadvertently downloaded

If you need help
- If running this in CI or wanting the repo to include an automated job that runs the download and commits the files, open an issue or request and include:
  - The stitch-export.json sample (redacted if necessary)
  - Any required checksum fields
  - Preferred handling of very large assets (LFS vs external CDN)

Last sanity-check
- After running, ensure:
  - All design image filenames referenced in the component code exist in this directory.
  - assets-mapping.txt contains the URL for each file so reviewers can audit sources.

End.