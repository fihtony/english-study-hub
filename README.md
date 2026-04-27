# english-study-hub
English Study Hub - a test app from Google Stitch

## Run & Test (Python 3.12 + venv + pytest)

Prerequisites
- Python 3.12 installed.

Create a virtual environment, install dependencies, and run the app (exact commands):
```bash
python3.12 -m venv .venv
.venv/bin/pip install -r requirements.txt
python run.py
```

Run tests (exact command):
```bash
.venv/bin/pytest -q
```

Dependencies (files)
- requirements.txt
- run.py

Repository
- target_repo_url: https://github.com/fihtony/english-study-hub

Ticket & PR guidance
- Jira: CSTL-1
- When opening or updating the PR for CSTL-1 (e.g., feature/CSTL-1-landing-page), include test evidence under /.work/:
  - /.work/pytest-output.txt (full pytest output)
  - /.work/cstl-1-plan.json (stage summary, PR links, branch names)
  - /.work/cstl-1-test-evidence.json (pytest output, commit SHAs, curl or screenshot evidence)
- Reference existing PRs (if present) such as PR #12 and PR #13 when linking diffs or CI logs.

Acceptance checklist for reviewers
- GET / returns 200 and renders app/templates/index.html with visible heading "English Study Hub"
- Static assets (static/css/styles.css) are referenced and served
- tests/test_landing.py passes with: .venv/bin/pytest -q
- Run instructions above reproduce local server and tests

Notes
- Use Python 3.12 and the provided venv commands to ensure deterministic environment.
- Keep test evidence and logs under the /.work/ directory and include commit SHAs and PR URLs in PR description.