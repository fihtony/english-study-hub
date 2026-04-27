#!/usr/bin/env bash
# scripts/post-jira-comment-and-transition.sh
#
# Posts a PR URL as a comment to CSTL-1 and transitions the ticket to "In Review".
# Requires:
#   - $JIRA_TOKEN        : Jira API token (Bearer)
#   - $JIRA_CLOUD_ID     : Atlassian cloud-id (the GUID portion) OR
#                          $JIRA_API_BASE : full API base (e.g. https://api.atlassian.com/ex/<cloud-id>/rest/api/3)
#   - PR_URL passed as first positional argument
#
# Logs request/response evidence to artifacts/jira-api.log
set -uo pipefail

# Helpers
timestamp() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

usage() {
  cat <<EOF
Usage: $0 <PR_URL>

Environment variables required:
  JIRA_TOKEN      - Jira API token (Bearer). Required.
  JIRA_CLOUD_ID   - Atlassian cloud id (GUID) OR
  JIRA_API_BASE   - full API base URL (overrides JIRA_CLOUD_ID), e.g. https://api.atlassian.com/ex/<cloud-id>/rest/api/3

This script posts a comment to issue CSTL-1 and transitions it to "In Review".
EOF
  exit 2
}

# Validate args/env
PR_URL="${1:-}"
if [ -z "$PR_URL" ] || [ "${PR_URL}" = "-h" ] || [ "${PR_URL}" = "--help" ]; then
  usage
fi

if [ -z "${JIRA_TOKEN:-}" ]; then
  echo "$(timestamp) ERROR: JIRA_TOKEN environment variable is required." >&2
  usage
fi

# Build API base
if [ -n "${JIRA_API_BASE:-}" ]; then
  API_BASE="${JIRA_API_BASE%/}" # trim trailing slash
elif [ -n "${JIRA_CLOUD_ID:-}" ]; then
  API_BASE="https://api.atlassian.com/ex/${JIRA_CLOUD_ID}/rest/api/3"
else
  echo "$(timestamp) ERROR: Either JIRA_CLOUD_ID or JIRA_API_BASE must be set." >&2
  usage
fi

ISSUE="CSTL-1"
LOG_DIR="artifacts"
LOG_FILE="${LOG_DIR}/jira-api.log"

mkdir -p "$LOG_DIR" || {
  echo "$(timestamp) ERROR: Failed to create artifacts directory: $LOG_DIR" >&2
  exit 3
}
# make log readable only by current user
touch "$LOG_FILE"
chmod 600 "$LOG_FILE" 2>/dev/null || true

# Safe logging function (never logs secrets)
log() {
  local level="$1"; shift
  local msg="$*"
  printf '%s [%s] %s\n' "$(timestamp)" "$level" "$msg" >>"$LOG_FILE"
}

log_stdout() {
  # also echo a short message to stdout for user visibility
  printf '%s\n' "$*" >&1
}

# Prepare comment payload (use python JSON escaping for safety)
comment_body="PR: ${PR_URL} — build/test logs attached in PR."
payload_comment=$(python3 - <<PY
import json,sys
print(json.dumps({"body": json.dumps("${comment_body}").strip('"')}) )
PY
)
# The above double-json approach was wrong for Jira's API; rebuild properly:
# Build the correct JSON: {"body": "PR: <PR_URL> — build/test logs attached in PR."}
payload_comment=$(python3 - <<PY
import json,sys
body = "PR: " + ${json.dumps(PR_URL)} + " — build/test logs attached in PR."
print(json.dumps({"body": body}))
PY
)

if [ -z "$payload_comment" ]; then
  echo "$(timestamp) ERROR: failed to construct comment payload" >&2
  exit 4
fi

log "INFO" "Starting Jira operations for issue ${ISSUE}. API_BASE=${API_BASE}"
log "INFO" "Comment payload: ${payload_comment}"

# Function to perform curl and capture HTTP status and body
# args: method url data(optional)
http_call() {
  local method="$1"; shift
  local url="$1"; shift
  local data="${1:-}"
  local tmp
  tmp=$(mktemp)
  # Use --fail to let curl return non-zero on >=400, but we still want body; avoid --fail to capture body.
  if [ -n "$data" ]; then
    response=$(curl -sS -X "$method" "$url" \
      -H "Authorization: Bearer ${JIRA_TOKEN}" \
      -H "Content-Type: application/json" \
      --data "$data" -w "\nHTTPSTATUS:%{http_code}" ) || curl_rc=$? && true
  else
    response=$(curl -sS -X "$method" "$url" \
      -H "Authorization: Bearer ${JIRA_TOKEN}" \
      -H "Content-Type: application/json" \
      -w "\nHTTPSTATUS:%{http_code}") || curl_rc=$? && true
  fi

  # Extract status
  http_status=$(printf "%s" "$response" | tr -d '\r' | sed -n 's/.*HTTPSTATUS:\([0-9][0-9][0-9]\)$/\1/p' || true)
  body=$(printf "%s" "$response" | sed -e 's/HTTPSTATUS:[0-9][0-9][0-9]$//' )

  # Return via stdout as: status<unit>body
  printf '%s\n' "$http_status"
  printf '%s' "$body"
}

# 1) POST comment
comment_url="${API_BASE}/issue/${ISSUE}/comment"
log_stdout "Posting comment to ${comment_url} ..."
resp=$(http_call "POST" "$comment_url" "$payload_comment")
read -r comment_status comment_body_rest <<<"$(printf '%s\n' "$resp" | sed -n '1p;2p')"
# If body is multi-line, reassemble
comment_body_full=$(printf '%s\n' "$resp" | sed -n '2,$p')

log "REQUEST" "POST ${comment_url}"
log "REQUEST" "Payload: ${payload_comment}"
log "RESPONSE" "HTTP ${comment_status}"
log "RESPONSE" "${comment_body_full}"

# Check expected 201
if [ -z "${comment_status}" ]; then
  echo "$(timestamp) ERROR: No HTTP response when posting comment." >&2
  exit 5
fi

if [ "$comment_status" -ne 201 ] && [ "$comment_status" -ne 200 ]; then
  echo "$(timestamp) ERROR: Failed to post comment to ${ISSUE} (HTTP ${comment_status}). See ${LOG_FILE} for details." >&2
  exit 6
fi

log_stdout "Comment posted (HTTP ${comment_status})."

# 2) Get transitions to find id for "In Review"
transitions_url="${API_BASE}/issue/${ISSUE}/transitions"
log_stdout "Fetching transitions from ${transitions_url} ..."
resp_tr=$(http_call "GET" "$transitions_url")
# First line status, remainder body (may be JSON)
trans_status=$(printf '%s\n' "$resp_tr" | sed -n '1p')
trans_body=$(printf '%s\n' "$resp_tr" | sed -n '2,$p')

log "REQUEST" "GET ${transitions_url}"
log "RESPONSE" "HTTP ${trans_status}"
log "RESPONSE" "${trans_body}"

if [ -z "${trans_status}" ]; then
  echo "$(timestamp) ERROR: No HTTP response when fetching transitions." >&2
  exit 7
fi

if [ "$trans_status" -ge 400 ]; then
  echo "$(timestamp) ERROR: Failed to fetch transitions (HTTP ${trans_status}). See ${LOG_FILE}." >&2
  exit 8
fi

# Parse transitions JSON to get transition id (prefer exact "In Review" but accept case-insensitive)
transition_id=$(python3 - <<PY
import sys, json
try:
    j = json.loads(sys.stdin.read())
except Exception as e:
    sys.exit(2)
transitions = j.get("transitions", []) if isinstance(j, dict) else []
# look for name matching "In Review" case-insensitive; fallback to first transition containing "review"
target = None
for t in transitions:
    name = t.get("name","")
    if name.lower() == "in review":
        target = t.get("id")
        break
if not target:
    for t in transitions:
        name = t.get("name","")
        if "review" in name.lower():
            target = t.get("id")
            break
if not target:
    # print nothing and exit non-zero
    sys.exit(3)
print(target)
PY
<<JSON
${trans_body}
JSON
)

if [ $? -ne 0 ] || [ -z "${transition_id:-}" ]; then
  echo "$(timestamp) ERROR: Could not determine transition id for 'In Review'. See ${LOG_FILE} for transitions response." >&2
  exit 9
fi

log "INFO" "Found transition id for 'In Review': ${transition_id}"
log_stdout "Transition id for 'In Review' is ${transition_id}."

# 3) POST transition
transition_payload=$(python3 - <<PY
import json,sys
print(json.dumps({"transition":{"id": str(${json.dumps(transition_id)})}}))
PY
)
# The above produced nested quoting; rebuild simpler:
transition_payload=$(python3 - <<PY
import json,sys
tid = ${json.dumps(transition_id)}
print(json.dumps({"transition":{"id": tid}}))
PY
)

transition_post_url="${API_BASE}/issue/${ISSUE}/transitions"
log_stdout "Transitioning issue ${ISSUE} to 'In Review' (POST ${transition_post_url}) ..."
resp_tr_post=$(http_call "POST" "$transition_post_url" "$transition_payload")
tr_post_status=$(printf '%s\n' "$resp_tr_post" | sed -n '1p')
tr_post_body=$(printf '%s\n' "$resp_tr_post" | sed -n '2,$p')

log "REQUEST" "POST ${transition_post_url}"
log "REQUEST" "Payload: ${transition_payload}"
log "RESPONSE" "HTTP ${tr_post_status}"
log "RESPONSE" "${tr_post_body}"

# Jira typically returns 204 No Content for a transition
if [ -z "${tr_post_status}" ]; then
  echo "$(timestamp) ERROR: No HTTP response when posting transition." >&2
  exit 10
fi

if [ "${tr_post_status}" -ne 204 ] && [ "${tr_post_status}" -ne 200 ]; then
  echo "$(timestamp) ERROR: Failed to transition issue (HTTP ${tr_post_status}). See ${LOG_FILE}." >&2
  exit 11
fi

log_stdout "Issue ${ISSUE} transitioned to 'In Review' (HTTP ${tr_post_status})."
log "SUCCESS" "Comment posted and issue transitioned. PR: ${PR_URL}"

exit 0