# english-study-hub
English Study Hub - a test app from Google Stitch

## Overview
A minimal Flask-based landing page for the English Study Hub project (CSTL-1). This repository is scaffolded for Python 3.12 using Flask and pytest for tests. The landing page implements the Stitch design (see Design & Acceptance sections below).

## Tech stack
- Language: Python 3.12
- Backend: Flask
- Testing: pytest, Flask test client
- Packaging: requirements.txt (pin dependencies)

## Setup (macOS / Linux)
1. Create a virtual environment and activate it:
   - python -m venv .venv
   - source .venv/bin/activate
2. Install dependencies:
   - .venv/bin/pip install -r requirements.txt
3. (Windows PowerShell)
   - python -m venv .venv
   - .venv\Scripts\Activate.ps1
   - .venv\Scripts\pip.exe install -r requirements.txt

Recommended pinned packages (example, see requirements.txt in repo):
- Flask (compatible with Python 3.12)
- pytest

## Run
Two supported ways to run the app locally:

A) Using the runner script (recommended, supports dynamic PORT):
- PORT=5000 .venv/bin/python run.py
- The run.py entrypoint reads the port via int(os.environ.get("PORT", 5000)).

B) Using flask CLI:
- export FLASK_APP=run.py
- export FLASK_ENV=production
- .venv/bin/flask run --host=0.0.0.0 --port=5000

The landing page is served at http://localhost:5000/

Security note: Run in a virtualenv and do not run with debug mode enabled in production.

## Tests
Run all tests with pytest:
- .venv/bin/pytest -q

Test coverage included:
- tests/test_factory.py — app factory returns a Flask instance, does not execute side-effects at import, accepts custom config (e.g., TESTING=True).
- tests/test_index_route.py — GET / returns 200, content-type text/html, contains page title and main H1 "English Study Hub".
- tests/test_static_files.py — verifies /static/css/styles.css served and contains brand color.
- tests/test_render_integration.py — ensures HTML references /static/css/styles.css and assets under /static/assets.
- Parametric tests check behavior for missing static files and app factory custom config.

## Stitch design (source of truth)
- Stitch project: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- Screen ID: 45ac4478a1b7455f861d7377f92105e6

Design fidelity: the templates and CSS in this repo aim to match the Stitch screen (typography, spacing, palette). If any exact font/asset is unavailable due to licensing, a visually similar web-safe alternative is used and documented in the PR.

## Branching & feature branch
Working branch for this ticket:
- feature/CSTL-1-landing-page

Create the branch from main for the implementation and open a PR. Include the PR description template (below) when opening the PR.

## PR description template (fill in when creating PR)
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1 (screen_id: 45ac4478a1b7455f861d7377f92105e6)
- Branch name: feature/CSTL-1-landing-page
- CI status: <CI status badge or summary>
- Files changed / added:
  - app/__init__.py (create_app factory)
  - app/routes.py (index route /)
  - app/templates/index.html (landing page)
  - static/css/styles.css (design CSS)
  - static/assets/ (any included images/icons)
  - run.py (app runner reading PORT from env)
  - requirements.txt
  - tests/ (pytest integration tests)
- Test results (pytest summary):
  - Example: 5 passed, 0 failed
- Design deviations (if any) and justification:
  - List any deviations from Stitch (e.g., fonts substituted), with mitigation steps.
- Artifacts:
  - Screenshot (desktop 1280x800): .work/screenshot-desktop-1280x800.png
  - Test logs: .work/test-results.txt
  - CI workflow run URL / badge

## CI recommendation
Add a GitHub Actions workflow that runs:
- Setup Python 3.12
- Install dependencies from requirements.txt
- Run pytest
- Upload test artifacts and the rendered screenshot (optional)

## Acceptance checklist (maps to tests)
- [ ] create_app factory present and import-safe
- [ ] GET / returns 200 and contains "English Study Hub" title and heading
- [ ] /static/css/styles.css served and contains brand color (hex)
- [ ] HTML references /static/css/styles.css and /static/assets/*
- [ ] pytest passes locally and in CI

## Visual evidence & artifacts
Place generated artifacts under .work/:
- .work/screenshot-desktop-1280x800.png — full-page screenshot of GET /
- .work/test-results.txt — pytest output
- .work/ci-summary.txt — CI run summary (if CI exists)

## Notes and constraints
- Backend is intentionally simple and static; no client-side JS is required to match the landing page.
- All changes are non-destructive and limited to the repository workspace.
- Follow OWASP guidance: templates escape content by default; avoid embedding user-supplied HTML without sanitization.

## Contact / Next steps
- Implement visual review: compare .work/screenshot-desktop-1280x800.png to the Stitch screen (screen_id above).
- Once visually approved and tests pass in CI, merge feature/CSTL-1-landing-page into main.

---

Thank you — this README documents how to set up, run, test, and review the CSTL-1 landing page implementation.