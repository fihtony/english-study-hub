# english-study-hub

English Study Hub - a test app from Google Stitch

## Overview

Minimal Flask-based landing page for the English Study Hub project. Built for Python 3.12 and intended as the CSTL-1 "Landing Page (Bare-bones)".

## Requirements

- Python 3.12 (explicitly required)
- Git
- A POSIX-compatible shell for local commands (Linux / macOS). Windows users may use PowerShell and adapt activation commands.

Key repository files used by this change:
- requirements.txt
- run.py
- app/__init__.py, app/routes.py, app/templates/index.html
- static/css/style.css
- tests/test_landing.py

## Run locally

Running the project locally (Unix/macOS). Use the exact Python 3.12 interpreter:

1. Create a virtual environment
python3.12 -m venv .venv

2. Activate the virtual environment
source .venv/bin/activate

(Windows PowerShell)
.venv\Scripts\Activate.ps1

3. Install dependencies
pip install -r requirements.txt

4. Run tests
pytest -q

5. Start the app
python run.py

6. Verify in your browser or with curl
http://127.0.0.1:5000/  — landing page should return 200 and include "English Study Hub"

## Testing

- Tests are written with pytest and import the top-level Flask `app` object.
- The tests use `app.testing = True` and `app.test_client()` to exercise routes without starting a live server.
- Run `pytest -q` after installing requirements.

## Branching & PR requirements

- Work for this ticket must be on branch: `feature/CSTL-1-landing-page`
- All commits and the PR must reference the Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Commit message examples:
  - "CSTL-1: scaffold landing page and tests"
  - "CSTL-1: add static assets and README run instructions"
- PR description should include:
  - Link to the Jira ticket (https://tarch.atlassian.net/browse/CSTL-1)
  - Brief summary of changes
  - How to run locally (copy the "Run locally" steps)
  - Test output snippet and a short verification step (curl or browser link)

## Reviewer checklist

- [ ] Verify Python 3.12 is used for venv and install
- [ ] Run `pytest -q` — all tests pass
- [ ] Start the app and confirm GET / returns 200 and contains "English Study Hub"
- [ ] Confirm branch name is `feature/CSTL-1-landing-page` and PR references CSTL-1 ticket
- [ ] Confirm no secrets or credentials were added

## Notes & rationale

This repository is intentionally minimal for the CSTL-1 acceptance criteria: a safe, test-covered, importable Flask `app` object and a simple landing page. The Run locally section uses exact commands to reproduce the environment with Python 3.12 and to make verification straightforward for reviewers.