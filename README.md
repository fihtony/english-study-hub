# english-study-hub

English Study Hub - a test app from Google Stitch

## Overview
A minimal Flask-based landing page implementing the Stitch design (https://stitch.withgoogle.com/projects/13629074018280446337?pli=1). This repository demonstrates a Python 3.12 + Flask application with a factory pattern and tests so the app is import-safe for automated testing.

## Tech stack
- Python 3.12
- Flask (2.x)
- pytest, pytest-cov

## Quick setup (macOS / Linux)
Run these exact commands to create a reproducible environment:

python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

Notes:
- requirements.txt contains: flask (2.x compatible), pytest, pytest-cov.
- Use the provided virtualenv to keep dependencies isolated.

## Run (development)
Option A — direct entrypoint (recommended for local dev):

python run.py

Option B — using Flask CLI with auto-reload:

export FLASK_APP=run.py && flask run --reload

The run.py entrypoint reads the port using:
int(os.environ.get("PORT", 5000))
which allows dynamic port assignment during testing and deployment.

## Tests
Run the test suite with:

pytest -q

Tests are deterministic and designed to be import-safe:
- create_app() is import-safe for tests (importing app package does not start the server).
- tests/test_factory.py verifies the factory returns a Flask app without side-effects.
- tests/test_routes.py uses app.test_client() to validate routes and static asset serving.

Expected: tests pass with pytest.

## Project structure (important files)
- requirements.txt
- run.py
- app/
  - __init__.py        # create_app factory (import-safe)
  - routes.py          # blueprint for GET /
  - templates/index.html
- static/css/styles.css
- tests/
  - test_factory.py
  - test_routes.py

## Design & accessibility
- Semantic HTML and accessible markup are used for the landing page.
- CSS is served from /static/css/styles.css and linked in templates using an absolute /static path so asset resolution works regardless of cwd.

## PR guidance (CSTL-1)
When creating the feature branch and PR, follow these expectations:
- Branch name: feature/CSTL-1-landing-page-<your-id>
- PR title/description must include:
  - Ticket key: CSTL-1
  - Stitch design URL: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
  - Files changed (list)
  - Test evidence: pytest output snippet showing tests passing (stdout)
  - Visual evidence: two screenshots (desktop 1366x768, mobile 375x812)
  - Any deviations from the Stitch design with short justifications
- Include commands used to run tests and start the dev server.

## CI (recommended)
Add a GitHub Actions workflow to run pytest on Python 3.12. If not present, run tests locally before opening PR.

## Security & best practices
- Factory pattern prevents side-effects on import and supports testability.
- Static assets are served from the project-root `/static` directory.
- No external network calls in tests; tests use Flask's test client.

## Contact / Handoff
After opening the PR, link it to Jira ticket CSTL-1 and attach the test artifacts and screenshots for review.