# English Study Hub

A minimal Flask-based landing page for the English Study Hub project. This repo implements a production-quality Flask app scaffold and CI to satisfy CSTL-1. The UI follows the Stitch design (see Stitch project link + screen id below) and is intentionally lightweight, semantic, and accessible.

Stitch design
- Project: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- Screen ID: 45ac4478a1b7455f861d7377f92105e6

Jira
- Ticket: https://tarch.atlassian.net/browse/CSTL-1

Tech stack
- Language: Python 3.12
- Web framework: Flask (factory pattern)
- Tests: pytest, pytest-cov
- CI: GitHub Actions (Python 3.12 runner)

Repository layout (important files)
- run.py — development entrypoint (reads PORT from env)
- requirements.txt — pinned dependencies
- app/
  - __init__.py — create_app(config=None) factory (side-effect free)
  - routes.py — route definitions (GET / renders index)
  - templates/index.html — landing page template (semantic)
- static/css/styles.css — tokens & layout matching Stitch
- tests/test_app.py — pytest tests (imports create_app; app.testing=True)
- .github/workflows/ci.yml — CI to install deps and run pytest
- .work/ — evidence & artifacts (.work/README.md included)

Quickstart (development)
1. Create and activate virtualenv (POSIX):
   python -m venv .venv
   . .venv/bin/activate
2. Install pinned dependencies:
   pip install -r requirements.txt
3. Run the app for manual testing:
   python run.py
   - The app uses: int(os.environ.get("PORT", 5000)) for the port.
   - Only starts when run.py executed as __main__; importing app package is side-effect free.

Testing
- Run the test suite:
  pytest
  or for CI-style run:
  pytest --maxfail=1 -q
- Tests verify:
  - create_app exists and can be imported without starting a server
  - GET / returns 200 and contains expected text from index.html
  - static files (CSS) are served and referenced correctly
- Example quick import check to ensure side-effect-free factory:
  python -c "import app; print('imported app package OK')"

Development notes & best practices
- Factory pattern: app/__init__.py exposes create_app(config=None). Pass a config dict or object for testing (e.g., {"TESTING": True}).
- Template folder is configured using:
  app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))
  to ensure templates load regardless of working directory.
- run.py imports create_app and only calls app.run(...) under if __name__ == "__main__": to prevent side-effects on import.
- Avoid introducing runtime side-effects on package import (no long-running threads, no DB connections, no app.run).

CI (GitHub Actions)
- CI installs Python 3.12, pip installs requirements, and runs:
  pytest --maxfail=1 -q
- Coverage artifacts are collected when configured in workflow.

PR checklist (use in PR body)
- Branch name: feature/CSTL-1-landing-page
- Include Stitch URL and screen id: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1 (screen id 45ac4478a1b7455f861d7377f92105e6)
- Link to Jira: https://tarch.atlassian.net/browse/CSTL-1
- Files changed (verify):
  - run.py
  - requirements.txt
  - app/__init__.py
  - app/routes.py
  - app/templates/index.html
  - static/css/styles.css
  - tests/test_app.py
  - .github/workflows/ci.yml
  - .work/README.md
- Evidence to attach (place under .work/ and link in PR):
  - .work/pytest-report.txt — full pytest output (stdout)
  - .work/coverage-summary.txt — coverage report (if produced)
  - .work/screenshots/desktop.png — rendered page @ 1366×768
  - .work/screenshots/mobile.png — rendered page @ 375×812
  - CI run link or workflow run id
  - Small note listing intentional deviations (if any) from Stitch tokens (fonts or icon substitutions) and reason
- Verification steps to include in PR description:
  - `python -c "import app; print('ok')"` (verifies create_app import side-effect-free)
  - `python run.py` then open http://127.0.0.1:5000/ or curl http://127.0.0.1:5000/
  - `pytest --maxfail=1 -q`

Security & quality
- No user input is accepted on the landing page; no DB or external service integrations are bundled.
- Template rendering uses Jinja2 autoescaping for any future dynamic content.
- Tests ensure the basic surface loads correctly; add further security tests as the project grows.

Notes about design fidelity
- Colors, spacing, and typography were matched to the Stitch screen where possible using CSS variables in static/css/styles.css.
- If Stitch-provided fonts or assets are not present, web-safe fallbacks are used; enumerate any substitutions in the PR.

Contact / next steps
- For additional pages or components, follow the same factory and blueprint pattern, add tests for each route, and update CI to run linting and coverage thresholds.