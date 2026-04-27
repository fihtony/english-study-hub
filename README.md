# english-study-hub

English Study Hub — a small Flask landing page implementation for Jira ticket CSTL-1.

Running and testing
- See RUNNING.md for exact, canonical run and test commands (virtualenv setup, pip install -r requirements.txt, python run.py, pytest -q). Always follow RUNNING.md when reproducing the app or CI artifacts.

Branch and ticket
- Landing page implemented on branch: feature/CSTL-1-landing-page
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1

PR guidance for reviewers (what to include in the PR description)
- Short summary of the change and purpose.
- Link to Jira: https://tarch.atlassian.net/browse/CSTL-1
- List of changed files.
- Commit SHAs included in the PR.
- Pytest console output (paste full `pytest -q` output or attach as artifact).
- Runtime verification outputs: curl headers and body demonstrating HTTP/1.1 200 OK and page body containing `<h1>English Study Hub</h1>` (paste results from `curl -s -D - http://127.0.0.1:5000/ -o /dev/null` and `curl -s http://127.0.0.1:5000/`).
- Prepared Jira comment text to copy into CSTL-1:
  "Created PR for CSTL-1 (landing page). Please review and move this ticket to 'In Review'. PR link and test/run artifacts are attached in the PR description."

Notes
- RUNNING.md is the authoritative source for exact commands and environment setup — use it for all reproduction and CI verification steps.