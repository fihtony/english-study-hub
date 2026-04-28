# english-study-hub

English Study Hub - a test app from Google Stitch

---

## Overview

A minimal Flask-based landing page for the English Study Hub project (CSTL-1). This repository provides a small, production-quality Flask app scaffold using the factory pattern, simple styling, and pytest-based tests. The landing page is intentionally minimal (hero, heading, short paragraph, CTA) to match the "bare-bones" ticket requirements.

Design reference (Stitch): https://stitch.withgoogle.com/projects/13629074018280446337?pli=1

Branch for this change: `feature/CSTL-1-landing-page`

---

## Tech stack

- Language: Python 3.12
- Web framework: Flask (factory pattern)
- Testing: pytest (Flask test_client)
- Minimal dependencies pinned in `requirements.txt`

---

## Project layout (important files)

- run.py
- requirements.txt
- app/
  - __init__.py        (create_app factory)
  - routes.py          (main blueprint, GET /)
  - templates/index.html
- static/
  - css/styles.css
- tests/
  - test_factory.py
  - test_routes.py
  - test_static.py
- .work/
  - test-output.txt
  - screenshots/landing.png

---

## Setup (developer)

1. Ensure Python 3.12 is installed.
2. Create and activate a venv:
   - Unix/macOS:
     - python -m venv .venv
     - source .venv/bin/activate
   - Windows (PowerShell):
     - python -m venv .venv
     - .\.venv\Scripts\Activate.ps1
3. Install dependencies:
   - pip install -r requirements.txt

Notes:
- requirements.txt pins Flask and pytest for compatibility with Python 3.12.

---

## Running the app (local development)

The application uses an app factory and a small run script.

Start the app:

- Unix/macOS:
  - export PORT=5000
  - python run.py
- Windows (PowerShell):
  - $env:PORT = 5000
  - python run.py

run.py reads the port from the environment: int(os.environ.get("PORT", 5000)) so CI and hosting providers can override the port. The Flask app is created via create_app() in app/__init__.py and serves templates from the package template folder.

Open: http://127.0.0.1:5000/

---

## Running tests

Tests are written with pytest and use Flask's test client.

Example:

- Activate venv, then:
  - pytest -q

Notes for tests:
- Tests import create_app from app and set app.testing = True
- Tests use app.test_client() (no live server or subprocesses)
- Tests cover factory behavior, GET / response contents, and static CSS presence

Captured test output is saved to `.work/test-output.txt` in this repo for review.

---

## Security & best practices

- The app uses the Flask factory pattern (no side effects on import).
- Templates are rendered server-side using Jinja2; user input is not injected unsafely in the landing page.
- Static assets are served via Flask's static route and referenced with url_for('static', filename='css/styles.css').
- No database or untrusted input handling in the landing page; follow OWASP guidance when adding features (parameterized queries, input validation, escaping, CSP headers, HTTPS).

---

## Files implemented for CSTL-1 (what was added/modified)

- run.py
- requirements.txt
- README.md (this file)
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/css/styles.css
- tests/test_factory.py
- tests/test_routes.py
- tests/test_static.py
- .work/test-output.txt (pytest output)
- .work/screenshots/landing.png (screenshot of /)

(If any file is missing, run the setup steps above and ensure the branch `feature/CSTL-1-landing-page` is checked out.)

---

## PR description template (use when opening the PR)

Title: CSTL-1 — Add bare-bones Landing Page (feature/CSTL-1-landing-page)

Body:
- Jira ticket: CSTL-1
- Stitch design reference: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- Summary: Implements a minimal landing page (hero header, short paragraph, CTA) using Flask factory pattern with tests.
- Files added/modified: (list from the "Files implemented" section above)
- Validation:
  - Local dev: python run.py (PORT env supported)
  - Tests: pytest -q (output attached at `.work/test-output.txt`)
  - Screenshot: `.work/screenshots/landing.png`
- Design deviations:
  - Target screen not found within the Stitch project exports. Implemented a minimal hero layout (heading "English Study Hub", short paragraph, CTA button) using neutral, accessible styling (primary color #2B6CB0, system sans fonts, centered hero).
  - Deviation rationale: absent explicit screen or assets in Stitch; implemented a minimal faithful layout to meet the ticket. If a specific Stitch screen ID or assets are provided, will update to match exact typography, spacing, and imagery.
- Artifacts (attached to PR or available in repo):
  - `.work/test-output.txt` — pytest output
  - `.work/screenshots/landing.png` — screenshot of GET /
- Notes: create_app is side-effect free to allow safe imports in tests. Tests use app.test_client() per guidelines.

---

## Developer checklist before requesting review

- [ ] Confirm Python 3.12 environment
- [ ] venv created and dependencies installed
- [ ] Run python run.py and visually confirm landing page
- [ ] Run pytest and confirm all tests pass; copy output to `.work/test-output.txt`
- [ ] Capture a screenshot of the landing page and place under `.work/screenshots/landing.png`
- [ ] Open PR from `feature/CSTL-1-landing-page` into `main` with the PR description template filled

---

## Contact / Next steps

For design updates, provide the exact Stitch screen ID or an exported asset pack (colors, fonts, imagery). With that, the landing page can be updated to match pixel-perfect designs and accessibility specifications.

Thank you — please review the PR created from branch: feature/CSTL-1-landing-page.