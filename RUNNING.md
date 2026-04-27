# RUNNING.md

Project: English Study Hub — CSTL-1 (Landing Page - Bare-bones)

This document contains exact, repeatable commands and the templates reviewers need to reproduce the local run and test outputs required for code review and PR creation.

Prerequisites
- Python 3.12 installed and available as `python3.12`
- Git
- Unix-like shell (Linux / macOS) or Windows (PowerShell / cmd)
- Network access for pip (or ensure requirements.txt is present locally)

Ensure requirements.txt includes at least:
- Flask
- pytest
(Consider pinning exact versions for CI reproducibility, e.g. Flask==3.0.0 pytest==7.4.0)

1) Create and activate a Python 3.12 virtual environment

Unix / macOS:
```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:
```powershell
python3.12 -m venv .venv
.venv\Scripts\Activate.ps1
```

Windows cmd.exe:
```cmd
python3.12 -m venv .venv
.venv\Scripts\activate
```

Security note: create the venv in the repo root, do not pip install as root, ensure `.venv` is in `.gitignore`.

2) Install dependencies

From repo root (with venv active):
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

3) Run the application locally (development server)

Start the app:
```bash
python run.py
```
- Default listen: 127.0.0.1:5000
- For quick background run on Unix:
```bash
python run.py & disown
```
Stop: `kill <PID>`

4) Run tests (pytest)

With venv active:
```bash
pytest -q
```

Tests must:
- Import create_app() from app or import app and set `app.testing = True`
- Use `app.test_client()` (no network access required)

Sample pytest output placeholder (copy actual output into PR body or attach as artifact):
```
$ pytest -q
.                                                                 1 passed in 0.12s
```
Replace the above with the actual console output produced locally.

5) Runtime verification with curl (exact commands reviewers will use)

After `python run.py` is running, run these exact commands in another shell:

Get response headers (should show 200 status line):
```bash
curl -s -D - http://127.0.0.1:5000/ -o /dev/null
```
Expected snippet to paste into PR (example):
```
HTTP/1.1 200 OK
Date: Mon, 27 Apr 2026 15:53:20 GMT
Server: Werkzeug/3.0.0 Python/3.12
...
```
Note: some environments may use HTTP/2; ensure the response status is 200 OK in that case.

Get page body and verify headline:
```bash
curl -s http://127.0.0.1:5000/
```
Expected minimal HTML snippet to paste into PR (must include the headline):
```html
<!doctype html>
<html lang="en">
<head>...</head>
<body>
  <header>
    <h1>English Study Hub</h1>
    <p class="tagline">Practice reading and improve your English.</p>
  </header>
  ...
</body>
</html>
```
PR reviewers should verify the body returned by curl contains `<h1>English Study Hub</h1>`.

6) Git branching, commit SHAs, PR creation template

Create branch, commit, push:
```bash
git checkout -b feature/CSTL-1-landing-page
git add .
git commit -m "CSTL-1: add landing page, tests, and RUNNING.md"
git push -u origin feature/CSTL-1-landing-page
```

Collect recent commit SHAs to include in PR description:
```bash
git log -n 5 --pretty=format:"%h %s"
```
Copy the relevant commit short SHAs (e.g., abc1234, def5678) into the PR description.

Create PR using GitHub CLI (example):
```bash
gh pr create --base main --head feature/CSTL-1-landing-page --title "CSTL-1: Landing page - bare-bones" --body-file ./RUNNING_PR_BODY.txt
```

PR description template (create RUNNING_PR_BODY.txt from the template below and pass to gh or paste into GitHub UI):

---
Implements CSTL-1: landing page.

Jira: https://tarch.atlassian.net/browse/CSTL-1

Summary:
- Adds minimal Flask app with app factory, landing route `/` rendering `index.html` containing `<h1>English Study Hub</h1>`
- Adds tests using Flask test_client(), requirements.txt, and RUNNING.md with reproduction instructions

Commits:
- <commit-sha-1>
- <commit-sha-2>

Changed files:
- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- requirements.txt
- tests/test_landing.py
- .gitignore
- RUNNING.md

Test run (paste actual pytest console output here):
```
<PASTE ACTUAL pytest -q OUTPUT HERE>
```

Runtime verification (paste curl outputs captured from local run here):

Headers (from: curl -s -D - http://127.0.0.1:5000/ -o /dev/null):
```
<PASTE ACTUAL HEADER OUTPUT HERE - should include "HTTP/1.1 200 OK">
```

Body (from: curl -s http://127.0.0.1:5000/):
```
<PASTE ACTUAL HTML BODY HERE - should contain "<h1>English Study Hub</h1>">
```

Jira comment (copy and paste into CSTL-1 to request transition to In Review):
```
PR for CSTL-1: feature/CSTL-1-landing-page -> main
PR URL: <PASTE PR URL HERE>
Summary: Adds a minimal landing page and tests. See PR description for commands and artifacts.
Requested action: Please transition CSTL-1 to "In Review" and assign reviewers.
Test artifacts: pytest output and curl verification are attached/pasted in the PR description.
Commits: <commit-sha-1>, <commit-sha-2>
```
---

7) CI / artifacts guidance

- Ensure CI uses Python 3.12.
- CI step examples (GitHub Actions):
  - checkout
  - setup-python@v4 (python-version: '3.12')
  - python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
  - pytest -q
- Optionally spin server and curl `/` for a smoke test (or rely on unit tests using test_client).

8) Tests - expected conventions

- tests/test_landing.py must import the app via `from app import create_app` or `from app import app`
- If using create_app():
```python
app = create_app()
app.testing = True
client = app.test_client()
resp = client.get('/')
assert resp.status_code == 200
assert b'English Study Hub' in resp.data
```
- Tests must not require network access.

9) Changed / created files (for PR and reviewer)
- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- requirements.txt
- tests/test_landing.py
- .gitignore
- RUNNING.md

10) Checklist for PR reviewers (ensure these are present in PR description)
- [ ] Branch: feature/CSTL-1-landing-page -> main
- [ ] Commits listed with SHAs
- [ ] pytest console output pasted (or CI artifact linked)
- [ ] curl header output pasted (contains 200 status line)
- [ ] curl body output pasted (contains `<h1>English Study Hub</h1>`)
- [ ] Jira comment text present in PR for easy copy/paste

11) Troubleshooting tips
- If curl headers show HTTP/2, confirm the status code 200 is present and paste the header block.
- If pytest fails, run `pytest -q -k <testname> -vv` to get more detail.
- If the landing page does not render `<h1>English Study Hub</h1>`, confirm templates are in `app/templates/index.html` and the app factory uses:
```python
app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))
```

12) Residual risks / follow-ups
- Development server (`python run.py`) is not for production. Use Gunicorn/uvicorn behind TLS for production.
- Pin dependencies in requirements.txt for reproducible CI builds.
- Add accessibility and i18n improvements for production readiness.

13) Metadata (for traceability)
- taskId: CSTL-1
- branch: feature/CSTL-1-landing-page
- recommended PR title: "CSTL-1: Landing page - bare-bones"
- agentId: Copilot (implementation)
- stage: implementation / verification

---

If any environment differences exist (python binary, CI runner image), adapt the commands above accordingly.