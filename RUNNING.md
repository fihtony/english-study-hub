# RUNNING.md

Project: English Study Hub — CSTL-1 (Landing Page - Bare-bones)

This file documents exact, repeatable commands to set up a Python 3.12 virtual environment, install dependencies, run the Flask application, run tests, and validate the landing page locally. It also contains brief implementation/CI guidance, changed-files list, sample validation output, and residual risks.

---

## Prerequisites

- Python 3.12 installed and available as `python3.12`
- Git (for branching/commits)
- Unix-like shell (Linux / macOS) or Windows (PowerShell or cmd)
- Network access for pip install (or ensure `requirements.txt` is available locally)

The repo includes:
- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/ (optional)
- requirements.txt
- tests/test_landing.py
- .gitignore

---

## 1) Create and activate a Python 3.12 venv

Unix / macOS:
```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

Windows (PowerShell):
```powershell
python3.12 -m venv .venv
.venv\Scripts\Activate.ps1
```

Windows (cmd.exe):
```cmd
python3.12 -m venv .venv
.venv\Scripts\activate
```

Security note: create the venv in the repository root and do not run pip as root. Ensure `.venv` is in `.gitignore`.

---

## 2) Install dependencies

From the repository root (after activating the venv):
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

requirements.txt must include at least:
- Flask>=3.0
- pytest

(If dependency resolution fails on your environment, pin compatible versions for Python 3.12.)

---

## 3) Run the application locally

Start the app with the provided entrypoint:
```bash
python run.py
```

- The app listens on 127.0.0.1:5000 by default.
- Do not run in production using `python run.py`. For production use a WSGI server (Gunicorn/uvicorn) behind a reverse proxy.

To run in background on Unix for quick local check:
```bash
python run.py & disown
```

To stop the process, run:
```bash
kill <PID>
```

---

## 4) Run tests (pytest)

Activate the venv (if not active) and run:
```bash
pytest -q
```

Tests are written to use Flask testing utilities:
- tests import create_app from `app` (app.create_app)
- tests set `app.testing = True` and use `app.test_client()`
- No external network access in tests; no live server required

Expected successful pytest output (example):
```
$ pytest -q
.                                                                 1 passed in 0.12s
```

---

## 5) Quick verification (curl)

After `python run.py` is running, verify the landing page with curl:

```bash
curl -sS http://127.0.0.1:5000/ | head -n 20
```

Expected output contains the landing page HTML and specifically the headline:
- Somewhere in the output: <h1>English Study Hub</h1>

Example snippet:
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

If the curl output does not show `<h1>English Study Hub</h1>`, stop the server and check run.py and app/templates/index.html.

---

## 6) Git, branching, PR (developer + CI maintainers)

Create the feature branch consistent with ticket:
```bash
git checkout -b feature/CSTL-1-landing-page
git add .
git commit -m "CSTL-1: add bare-bones landing page (Flask) and tests"
git push -u origin feature/CSTL-1-landing-page
```

Open a PR against `main` (examples):

Using GitHub CLI:
```bash
gh pr create --base main --head feature/CSTL-1-landing-page --title "CSTL-1: Landing page" --body "Implements bare-bones landing page. Includes tests; run `pytest -q`."
```

Or manually open a PR in the GitHub UI. In the PR description include:
- Commands used to run & test locally (copy from this file)
- pytest output
- curl output used to validate server
- Branch name and commit SHA(s)

---

## 7) CI suggestions (example job steps)

A minimal CI job for GitHub Actions should:
- Use Python 3.12 runner
- Create venv and install requirements
- Run pytest
- Optionally run a basic smoke test by spinning up the app and curling `/` (or rely on tests which use test_client)

Example steps (YAML pseudocode):
- uses: actions/setup-python@v4
  with: python-version: '3.12'
- run: python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
- run: pytest -q

Ensure the CI runner's environment matches Python 3.12.

---

## 8) Implementation summary (concise)

- Implemented a minimal Flask app (app factory pattern) exposing `/` which renders server-side template `index.html`.
- run.py runs the app on 127.0.0.1:5000 for local development.
- Tests exercise the factory with Flask `test_client()` and assert response `200` and presence of `<h1>English Study Hub</h1>`.
- Added `.gitignore` entries for `.venv`, `__pycache__`, and `*.pyc`.

---

## 9) Changed / created files (for PR & reviewer)

- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/style.css (optional)
- requirements.txt
- tests/test_landing.py
- .gitignore
- RUNNING.md (this file)

Include these files in the single commit for CSTL-1.

---

## 10) Validation evidence (paste into PR or artifacts)

Example local commands and expected outputs to include in PR body:

- Create venv & install:
```
$ python3.12 -m venv .venv
$ source .venv/bin/activate
(.venv) $ pip install -r requirements.txt
```

- Run tests:
```
(.venv) $ pytest -q
.                                                                 1 passed in 0.12s
```

- Run server and curl:
```
(.venv) $ python run.py
 * Running on http://127.0.0.1:5000
# in another terminal:
$ curl -sS http://127.0.0.1:5000/ | head -n 20
<!doctype html>
<html lang="en">
...
  <h1>English Study Hub</h1>
...
```

Attach these logs to the PR (or paste them in the PR description).

---

## 11) Residual risks / follow-ups

- Production deployment: this project uses the development server. For production, deploy with a WSGI server (Gunicorn, uWSGI) and configure TLS/HTTPS, proper host binding, and process supervision.
- Dependency pinning: consider pinning exact dependency versions for reproducible CI.
- Accessibility & i18n: the landing page is bare-bones; follow a11y guidelines and add translations as needed.
- Security: no user input or data storage is present in this scope. If adding user input later, validate and escape all inputs.

---

## 12) Metadata (for traceability)

- taskId: CSTL-1
- branch: feature/CSTL-1-landing-page
- recommended PR title: "CSTL-1: Landing page - bare-bones"
- agentId: Copilot (implementation)
- stage: implementation / verification

---

If anything in the environment (Python path, CI runner image, or required tooling) differs, adapt the commands above accordingly.