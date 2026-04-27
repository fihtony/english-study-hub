# english-study-hub

English Study Hub - a minimal Flask landing page for CSTL-1.

Overview
--------
This repository provides a small Flask app (Python 3.12) with tests and a reproducible developer workflow. The goal for CSTL-1 is a safe, test-covered, importable Flask `app` object and a simple landing page that contains "English Study Hub".

Requirements
------------
- Python 3.12 (explicit)
- Git
- A POSIX-compatible shell (Linux/macOS). Windows PowerShell commands are noted where different.
- Dependencies declared in requirements.txt
- Key files:
  - run.py
  - requirements.txt
  - app/__init__.py
  - app/routes.py
  - app/templates/index.html
  - static/css/style.css
  - tests/test_landing.py

Quickstart (exact reproducible commands)
---------------------------------------
Use the exact Python 3.12 interpreter and commands below.

1. Create & activate a virtual environment (Unix/macOS)
   python3.12 -m venv .venv && source .venv/bin/activate

   (Windows PowerShell)
   python3.12 -m venv .venv
   .venv\Scripts\Activate.ps1

2. Install dependencies
   pip install -r requirements.txt

3. Run tests (local)
   pytest -q

   Note: tests import the top-level Flask app:
   from app import app
   and tests set:
   app.testing = True
   and use:
   client = app.test_client()

4. Start the application (either)
   FLASK_APP=run.py flask run --port=5000
   or
   python run.py

5. Verify with curl (examples)
   # status line (should show HTTP/1.1 200 OK or HTTP/1.0 200 OK)
   curl -s -D - http://127.0.0.1:5000/ | head -n 1

   # check HTML body contains the expected phrase
   curl -s http://127.0.0.1:5000/ | grep "English Study Hub"

Branch / commit / push (exact commands)
---------------------------------------
All work for CSTL-1 must be done on branch: feature/CSTL-1-landing-page

From repository root:
git checkout -b feature/CSTL-1-landing-page
git add .
git commit -m "CSTL-1: add landing page and tests"
git push -u origin feature/CSTL-1-landing-page

Get commit SHA(s):
# single commit SHA (most recent)
git rev-parse HEAD

Or list the last few commits:
git log --oneline -n 5

PR creation & description requirements
-------------------------------------
Create a Pull Request (base: main) with a title containing `CSTL-1`. The PR description MUST include the following evidence and sections exactly as shown (use the template below and paste outputs).

PR description template (copy-paste & fill):

- Jira ticket: CSTL-1 — https://tarch.atlassian.net/browse/CSTL-1
- Branch: feature/CSTL-1-landing-page
- Commit SHA(s):
  - HEAD: <paste output of `git rev-parse HEAD` here>
  - (optional) additional SHAs: <git log --oneline -n 3>

- Pytest output (paste the full `pytest -q` run here; include exact stdout lines):
  ```
  <paste full pytest -q run here>
  ```
  Example expected lines (for formatting reference only):
  2 passed in 0.12s

- curl verification (paste the exact commands run and their outputs):
  ```
  # status line (example)
  curl -s -D - http://127.0.0.1:5000/ | head -n 1
  HTTP/1.1 200 OK

  # html grep example
  curl -s http://127.0.0.1:5000/ | grep "English Study Hub"
  <h1>English Study Hub</h1>
  ```

- CI / workflow run URL(s):
  - If using GitHub Actions, paste the workflow run URL (example):
    https://github.com/<owner>/<repo>/actions/runs/<run-id>
  - Attach or paste relevant test logs from CI if available.

- Short summary of changes:
  - One-paragraph summary of what changed and why.

Reviewer acceptance checklist (to include in PR)
------------------------------------------------
- [ ] Branch name is `feature/CSTL-1-landing-page`
- [ ] Commit message includes `CSTL-1`
- [ ] Local pytest run pasted into PR and shows all tests passing
- [ ] curl evidence pasted and shows HTTP 200 and "English Study Hub"
- [ ] CI run URL included and shows passing tests
- [ ] README updated with exact run/test commands (this file)
- [ ] `from app import app` works and tests use `app.test_client()` (state this in PR)

Triggering CI
-------------
- Pushing the branch and opening a PR should trigger CI (GitHub Actions or other).
- Copy the CI workflow run URL from the Actions page and paste into the PR description under "CI / workflow run URL(s)".

Jira: transition and comment (manual steps for reviewers/authors)
-----------------------------------------------------------------
After the PR is created, perform the following in Jira:

1. Transition the ticket CSTL-1 to "In Review" (or the equivalent workflow state).
2. Add a Jira comment on CSTL-1 with the following content (paste actual URLs/outputs):
   - PR URL: <paste full PR URL here>
   - Commit SHA(s): <paste `git rev-parse HEAD` output here>
   - Pytest output: <paste full pytest -q output here>
   - CI workflow URL: <paste CI run URL here>
   - Short summary: "Added minimal landing page and tests; app importable as `from app import app`; tests use `app.test_client()`."

Example Jira comment text:
```
Transition to In Review.

PR: <PR URL>
Commit: <git rev-parse HEAD>
Pytest:
<full pytest -q run pasted here>

CI: <CI workflow run URL>

Summary: Added landing page and tests. App is importable via `from app import app`. All tests pass locally and on CI.
```

Required PR attachments / evidence
---------------------------------
- Full `pytest -q` output pasted into PR description (not only a screenshot).
- The curl command outputs demonstrating HTTP 200 and containing "English Study Hub".
- CI workflow run URL (or pasted logs if your CI system doesn't provide a stable URL).
- Commit SHA(s) showing changes were pushed to origin.

Post-PR final verification
--------------------------
After creating the PR:
1. Re-run tests locally and paste the final pytest output into the PR.
   pytest -q

2. Ensure the PR description contains:
   - The pasted pytest output (exact lines)
   - The curl command outputs (status line + grep output)
   - CI workflow run URL
   - One commit SHA (git rev-parse HEAD)

Example full verification sequence (execute and paste outputs into PR and Jira):
```
# create branch, commit, push
git checkout -b feature/CSTL-1-landing-page
git add .
git commit -m "CSTL-1: add landing page and tests"
git push -u origin feature/CSTL-1-landing-page

# SHA
git rev-parse HEAD
# => abcdef1234567890abcdef1234567890abcdef12

# run tests locally and paste
pytest -q
# => 2 passed in 0.12s

# start server
FLASK_APP=run.py flask run --port=5000 &

# curl checks
curl -s -D - http://127.0.0.1:5000/ | head -n 1
# => HTTP/1.1 200 OK

curl -s http://127.0.0.1:5000/ | grep "English Study Hub"
# => <h1>English Study Hub</h1>
```

CI guidance (GitHub Actions)
---------------------------
- Ensure your repository has a workflow that runs pytest on push/PR.
- After pushing branch and opening PR, open the Actions tab, click the latest run for this PR and copy the run URL into the PR description.
- Example pattern for run URL:
  https://github.com/<owner>/<repo>/actions/runs/<run-id>

Security & testing notes
------------------------
- Tests import the application with:
  from app import app
  and use:
  app.testing = True
  client = app.test_client()

- The app is intentionally minimal; routes sanitize inputs and templates are rendered using Flask's Jinja2 escape rules. The project follows OWASP guidance for this minimal surface: no direct SQL or unsafe evals, templates use autoescaping, and test coverage ensures the index route returns expected content.

Files of interest
-----------------
- run.py — local entrypoint (also supports FLASK_APP)
- requirements.txt — runtime & test deps (ensure `pip install -r requirements.txt`)
- app/__init__.py — creates the `app` Flask object (importable via `from app import app`)
- app/routes.py — route definitions tested by tests
- app/templates/index.html — landing page HTML
- static/css/style.css — small stylesheet referenced by index
- tests/test_landing.py — pytest tests that assert response 200 and presence of content

PR template (copy into GitHub PR creation UI)
---------------------------------------------
Title:
CSTL-1: add landing page and tests

Body:
See "PR description template" above — paste the required fields and outputs.

Execution report (what to paste back to reviewers)
-------------------------------------------------
After completing the steps, paste these into your reviewer update or Jira comment:
- PR URL: <paste PR URL>
- One commit SHA: <git rev-parse HEAD>
- Final pytest run (exact output of `pytest -q`):
  ```
  <paste exact pytest -q output here>
  ```
- curl verification (paste exact commands and outputs):
  ```
  curl -s -D - http://127.0.0.1:5000/ | head -n 1
  <status line>

  curl -s http://127.0.0.1:5000/ | grep "English Study Hub"
  <html snippet>
  ```

Support
-------
If anything in the verification steps fails (tests or CI), collect the failing output, include it in the PR description and Jira comment, and request a reviewer for guidance. Keep the PR title and commit messages annotated with CSTL-1 for traceability.

License / Notes
---------------
This README documents the exact, reproducible local workflow for Python 3.12 required by CSTL-1 and the PR/Jira evidence steps reviewers require. Follow the commands exactly (shell quoting and environment activation matters).