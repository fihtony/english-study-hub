# English Study Hub

English Study Hub is a minimal Flask-based landing page scaffolded from a Google Stitch design. It implements a small, accessible, responsive landing page and automated tests to validate the app factory, the landing page rendering, and static assets.

Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1  
Screen ID: 45ac4478a1b7455f861d7377f92105e6  
Ticket: CSTL-1

Tech stack
- Language: Python 3.12
- Web framework: Flask (factory pattern)
- Testing: pytest, pytest-cov

Prerequisites
- Python 3.12 installed and on PATH
- A POSIX shell (bash) for the example commands below (Windows users: adapt virtualenv activate step)

Quick start (development)
1. Create and activate virtualenv:
   python3.12 -m venv .venv
   . .venv/bin/activate
2. Install dependencies:
   pip install -r requirements.txt
3. Run tests:
   pytest -q
4. Run the app locally:
   python run.py
   - The app listens on port defined by PORT env var or 5000 by default:
     export PORT=5000
     python run.py
   - For production-like behavior, run behind a WSGI server (gunicorn, etc.)

Files added/modified by CSTL-1 (root-relative)
- requirements.txt
- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/css/styles.css
- app/files/stitch/13629074018280446337/45ac4478a1b7455f861d7377f92105e6/assets/placeholder.txt
- tests/test_app_factory.py
- tests/test_landing_integration.py
- tests/test_static_files.py
- README.md (this file)
- .work/screenshots/CSTL-1-landing-desktop.png (artifact)
- .work/screenshots/CSTL-1-landing-mobile.png (artifact)

Implementation notes / security
- Flask app follows the factory pattern: create_app(config_overrides=None).
- Templates and static folders configured so /static/* resolves regardless of current working directory.
- No user-generated HTML is rendered unsafely — templates use Jinja2 autoescaping.
- Tests exercise the app via app.test_client() and run with app.testing = True to avoid side effects.
- No DB or external secrets are committed.

Run / test commands (copy/paste)
- Create venv and install:
  python3.12 -m venv .venv
  . .venv/bin/activate
  pip install -r requirements.txt
- Run tests:
  pytest -q
- Start dev server:
  python run.py
  # or using FLASK_APP (not required by this scaffold):
  flask run --port 5000

Reproducing screenshots
Option A — Headless Chrome/Chromium (recommended if installed)
- Desktop (1366x768):
  google-chrome --headless --hide-scrollbars --window-size=1366,768 --screenshot=.work/screenshots/CSTL-1-landing-desktop.png http://127.0.0.1:5000
- Mobile (375x812):
  google-chrome --headless --hide-scrollbars --window-size=375,812 --screenshot=.work/screenshots/CSTL-1-landing-mobile.png http://127.0.0.1:5000

Option B — Playwright (cross-platform)
- Install Playwright (node) and run a small capture script, or use npx playwright to take screenshots (requires Node).

Notes about the screenshots included in this branch
- Saved under .work/screenshots/.
- Filenames:
  - .work/screenshots/CSTL-1-landing-desktop.png (1366×768)
  - .work/screenshots/CSTL-1-landing-mobile.png (375×812)

Acceptance tests mapping (for reviewers)
- tests/test_app_factory.py
  - Verifies create_app is importable with no side effects and returns a Flask app with TESTING config override support.
- tests/test_landing_integration.py
  - GET / returns 200, Content-Type text/html, contains the primary site title and headline text, and references /static/css/styles.css in the HTML head.
- tests/test_static_files.py
  - Requests /static/css/styles.css and asserts 200 and that primary Stitch color and typography tokens appear in CSS content.

PR & branch guidance
- Branch name: feature/CSTL-1-landing-page
- Commit messages: concise and focused, e.g. "CSTL-1: scaffold landing page, app factory, and tests"
- Include this PR checklist in the description:
  - Link to Stitch design + screen_id
  - List of changed files (see Files added/modified above)
  - Test run output (pytest -q) and exit code
  - Attach both screenshots from .work/screenshots/
  - Map acceptance criteria to tests (see Acceptance tests mapping)
  - Note any deviations (fonts, exact spacing, or missing exported assets) and justification
- When committing from automation, include the required Co-authored-by trailer:
  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

Troubleshooting
- If a port is already in use, set PORT to another available port before running:
  export PORT=8080
  python run.py
- If static assets don't load, ensure static/ folder is present at repo root and that run.py creates the app via the factory so static_folder resolves correctly.

Design fidelity & deviations
- Colors, spacing, and typography are defined in CSS variables in static/css/styles.css driven by Stitch style tokens.
- If proprietary fonts were used in the Stitch design and are not available, system fallbacks are used; this is documented in the PR and acceptable for this ticket.

Contact / next steps
- Ticket: CSTL-1 (Constellation)
- For visual tweaks (fonts, spacing, exported assets), add follow-up tasks referencing the Stitch screen_id and attach the original exported assets to app/files/stitch/.../assets/.

Thank you — verify locally with the commands above, run pytest, and compare screenshots to the Stitch design.