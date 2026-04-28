Stitch design assets — provenance, placeholders, and replacement instructions
============================================================================

Source of truth
---------------
- Stitch project ID: 13629074018280446337
- Stitch screen ID: 45ac4478a1b7455f861d7377f92105e6
- Stitch design URL (reference only): https://stitch.withgoogle.com/projects/13629074018280446337?pli=1

Why this file exists
--------------------
The repository intentionally DOES NOT include licensed or third‑party binary assets exported from Stitch (SVG/PNG/JPG/ICO). This README documents expected asset filenames referenced by the code and identifies lightweight placeholder files included for local development and visual testing. Replace placeholders with properly licensed production assets before deploying.

Expected asset filenames and paths
---------------------------------
The Flask templates and CSS reference the following files under static/assets/:
- static/assets/logo.svg
  - Purpose: primary site logo (header & favicon source)
  - Placeholder: a simple, permissive SVG is included for layout only.
  - Recommendation: provide a licensed, optimized SVG preserving viewBox; keep filename unchanged or update templates/CSS accordingly.
- static/assets/logo-mark.svg
  - Purpose: compact logo mark used in small breaks / favicons
  - Recommendation: 64x64 to 256x256 viewBox; SVG preferred.
- static/assets/hero-bg.png
  - Purpose: hero section background image / decorative art
  - Recommendation: high-quality PNG/JPG, optimized for web. Typical desktop width: 1280px.
- static/assets/illustration-1.svg
  - Purpose: inline/hero illustration (vector)
  - Recommendation: preserve SVG semantics and IDs to avoid CSS selector collisions.
- static/assets/favicon.ico
  - Purpose: browser favicon fallback
  - Recommendation: include ICO for broad compatibility plus an SVG favicon; ensure favicon manifests if used.
- static/assets/social-preview.png
  - Purpose: Open Graph / social preview image (1200x630 recommended)
  - Recommendation: PNG or JPG, licensed for distribution.

Placeholders included (if present)
----------------------------------
- static/assets/logo.svg — lightweight placeholder (single-color vector). It exists only to avoid broken layout during development. Replace with your licensed logo file before publishing.
- Any other .svg/.png shipped here are minimal placeholders or legally permissive demo art.

How to replace placeholders safely
---------------------------------
1. Acquire assets with appropriate licensing (ownership, created by team, or purchased with redistribution rights).
2. Optimize assets for the web:
   - SVG: remove editor metadata, minimize IDs, run through svgo or similar.
   - PNG/JPG: export at appropriate dimensions and compress (mozjpeg, pngquant, WebP where acceptable).
3. Preserve filenames to avoid template/CSS changes OR:
   - If you rename files, update references in:
     - app/templates/index.html
     - static/css/styles.css
4. Remove placeholders from git if they contain demo or confidential content; instead add the production asset or keep them in a private asset store. Do NOT commit private keys or unlicensed art.

Security & licensing notes
-------------------------
- Do not commit licensed assets you are not entitled to publish. If an asset license forbids redistribution, store that asset out-of-repo and reference it via deployment scripts or environment-specific bundling.
- Sanitize any user-submitted images before serving. This project currently serves only static, repository-managed assets.
- For externally hosted assets, use HTTPS and pinned integrity checks where feasible.

Verification after replacement
------------------------------
- Start the app (see README.md) and load GET / in a browser.
- Confirm:
  - Header logo displays without distortion.
  - Hero image appears and scales responsively.
  - Favicon and social preview render correctly (use browser tools / social preview validators).
- Run the automated tests (pytest) — tests assert static file presence and CSS content; update tests if filenames change.

Developer notes
---------------
- Templates and CSS expect these asset paths exactly under static/assets/. If moving assets into a build step (e.g., hashed filenames), update Jinja templates or implement a manifest lookup.
- This README is intentionally conservative: it lists all files the design references. If you add new design elements, add corresponding assets and document them here.

Contact / provenance trace
--------------------------
- If you need original Stitch exports or source SVGs, request access from the design owner/team and confirm redistribution rights before committing.
- Keep a short provenance log in project docs noting asset source, license, and date-of-import for auditability.