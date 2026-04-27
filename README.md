english-study-hub
==================

English Study Hub - a test app from Google Stitch

Overview
--------
This repository provides a minimal, production-oriented Flask landing page implementation for ticket CSTL-1. It includes a small Flask application factory, a single landing route, static CSS, and pytest-based tests. The goal is a lightweight, secure, and testable starting point that matches the Stitch design brief (link below) with intentional deviations documented.

Tech stack
----------
- Language: Python 3.12 (required)
- Web framework: Flask (application factory pattern)
- Test framework: pytest
- Runtime / tools: POSIX shell for setup commands

Important runtime details
- App factory returns a Flask app with templates resolved independent of CWD:
  app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))
- run.py reads the port with: int(os.environ.get("PORT", 5000))

Quickstart — Setup
------------------
1. Create virtualenv with Python 3.12:
   python3.12 -m venv .venv
2. Activate:
   source .venv/bin/activate
3. Install dependencies:
   pip install -r requirements.txt

Run (local)
-----------
Start the app for manual verification:
export PORT=5000
python run.py
Open http://127.0.0.1:5000 in a browser.

Tests
-----
Run the test suite with:
pytest -q

Tests included (high level)
- tests/test_factory.py — ensures create_app() returns an app and import-time side-effects are none.
- tests/test_routes.py — verifies GET / returns 200, correct Content-Type, and contains heading + CTA.
- tests/test_static.py — ensures /static/css/styles.css is served with mimetype text/css and contains expected rules.
- tests/test_integration_render.py — checks HTML references /static/css/styles.css and key DOM snippets.
- Tests run against app.test_client(); app.testing is set in tests.

Files added/modified for CSTL-1
------------------------------
- requirements.txt (runtime + test pins)
- run.py (entrypoint; uses create_app())
- app/__init__.py (create_app factory, register blueprints)
- app/routes.py (landing page blueprint, GET /)
- app/templates/index.html (landing page markup — "English Study Hub", primary CTA)
- static/css/styles.css (styling approximating Stitch design)
- tests/ (pytest test suite described above)
- .gitignore (standard Python ignores)
- README.md (this document)
- .work/screenshots/ (place to store desktop and mobile screenshots for PR)

Design references
-----------------
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch project (design): https://stitch.withgoogle.com/projects/13629074018280446337?pli=1

Screenshots
-----------
Place verification screenshots in the PR under:
.work/screenshots/
Recommended filenames:
- .work/screenshots/landing-desktop-1280x720.png
- .work/screenshots/landing-mobile-375x812.png

PR Description checklist (required)
----------------------------------
When opening the PR titled "CSTL-1: Implement Landing Page (bare-bones)" include:
- Link to Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design URL (above)
- List of files changed (see Files added/modified)
- How to run locally (Setup + Run + Tests)
- Path to screenshots (.work/screenshots/)
- Short reviewer checklist:
  - create_app factory exists and import is side-effect free
  - GET / returns 200 and contains "English Study Hub" and CTA text
  - /static/css/styles.css served and linked by template
  - pytest -q passes locally
  - screenshots attached
- Note intentional deviations (see "Design deviations & security notes" below)

Design deviations & security notes
---------------------------------
- Fonts: If the Stitch project uses proprietary or Google Fonts, this scaffold uses system-safe fallbacks to avoid external network dependency during tests. Add font imports in static CSS if project policy allows external fonts.
- Colors and spacing: CSS approximates Stitch layout and color palette. Minor visual differences are documented in the PR under "Deviations".
- JavaScript: No client-side JS is included — landing page is CSS-only as permitted by the ticket.
- Security (OWASP considerations):
  - No database or external inputs are used.
  - Templates escape data by default (Flask/Jinja2) — do not mark untrusted input as safe.
  - If user-provided content is added later, use parameterized queries (if a DB is introduced), input validation, and Content Security Policy (CSP) headers.
  - Static assets served only from /static/; ensure production deployment uses a hardened web server or CDN.

Validation steps (commands + expected outcomes)
----------------------------------------------
These steps show how to validate locally; run from repo root.

1) Setup
   python3.12 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt

   Expected: dependencies install without error.

2) Manual run
   export PORT=5000
   python run.py

   Expected: server starts and logs a listening message; visiting http://127.0.0.1:5000 shows the landing page with heading "English Study Hub" and a visible primary CTA ("Get Started" or design CTA).

3) Tests
   pytest -q

   Expected: All tests pass. Each test checks an acceptance criterion described in Tests.

4) Static file check (manual curl)
   curl -sSf http://127.0.0.1:5000/static/css/styles.css | head -n 5

   Expected: HTTP 200 and CSS content (e.g., body { font-family: ... } or :root --primary-color).

Residual risks and follow-ups
----------------------------
- Visual parity: Exact font and pixel-perfect spacing may require adding external fonts and refining CSS. These are low priority for this first ticket but should be tracked as follow-ups if exact parity is required.
- CI integration: Add a GitHub Actions workflow to run pytest on PRs if CI isn't present yet.
- Accessibility testing: Manual accessibility review or automated checks (axe-core) are recommended before final QA.
- Production static serving: In production, static files should be served by the web server / CDN and not via Flask for performance.

Authoring & commit notes
------------------------
- Branch name: feature/CSTL-1-landing-page
- Commit messages should reference CSTL-1.
- PR title: CSTL-1: Implement Landing Page (bare-bones)

Contact / Handoff
-----------------
For questions or design clarifications reference the Jira ticket CSTL-1 and attach screenshots to the PR at .work/screenshots/. The Stitch URL is the design source of truth; deviations are documented in the PR body.