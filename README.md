English Study Hub
=================

Project purpose
---------------
A minimal Flask-based landing page implementing CSTL-1 (English Study Hub) to match the provided Stitch design (Stitch project: https://stitch.withgoogle.com/projects/13629074018280446337 — screen id: 45ac4478a1b7455f861d7377f92105e6). This repository scaffolds a small Flask factory app, a single landing route, static assets, and tests so the UI can be reviewed and validated quickly.

Tech stack
----------
- Language: Python 3.12 (required)
- Web framework: Flask (WSGI)
- Test runner: pytest, pytest-cov
- No Node/React — pure server-rendered HTML/CSS

Quick setup (Linux / macOS)
---------------------------
1. Create a virtual environment:
   python3.12 -m venv .venv
2. Activate it:
   source .venv/bin/activate
3. Install dependencies:
   pip install -r requirements.txt

Running the dev server
----------------------
Start the app (the script reads PORT from environment; defaults to 5000):
   python run.py

Then open http://localhost:5000 in a browser.

Testing
-------
Run the test suite:
   pytest -q

Notes for tests
- The application exposes a factory function app.create_app() for tests and importing. Example in tests:
    from app import create_app
    app = create_app()
    app.testing = True
    client = app.test_client()
- Tests assert page status, key content, and that static assets are served.

Files added/modified for CSTL-1
------------------------------
- requirements.txt
- run.py
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/css/style.css
- tests/test_landing.py
- .gitignore
- README.md (this file)

Repository branch for work
--------------------------
Branch name: feature/CSTL-1-landing-page

Artifacts and visual evidence
-----------------------------
Screenshot artifacts (when produced by CI or local test run) are stored under:
  artifacts/screenshots/
Expected filenames:
  - artifacts/screenshots/landing_desktop.png  (1366x768)
  - artifacts/screenshots/landing_mobile.png   (375x812)

Design reference and deviations
------------------------------
Design source: Stitch project (link above). The implementation targets pixel-accurate layout for desktop and mobile. Any intentional deviations (e.g., font substitutions for licensing/availability or minor spacing adjustments for responsive behavior) are documented in code comments in static/css/style.css and in the PR description.

Security and best practices
---------------------------
- No dynamic SQL or database access in this scaffold.
- Templates use Jinja2 with autoescaping enabled for HTML contexts.
- Static assets are served from the project-level static/ directory so paths like /static/css/style.css resolve consistently.
- run.py reads port via int(os.environ.get("PORT", 5000)) to support CI/dynamic assignment.

CI / Local validation hints
---------------------------
- Use the same Python 3.12 interpreter in CI to avoid incompatibilities.
- Tests are runnable with: pytest -q
- For screenshot generation, use a headless browser (Playwright / Chromium) or CI job that captures the rendered page at the resolutions listed above and writes files under artifacts/screenshots/.

How to import the app programmatically
-------------------------------------
The factory is exposed as app.create_app(). To import and run programmatically:
   from app import create_app
   app = create_app()
   app.run(port=5000)

Contact / Next steps
--------------------
Open a PR from branch feature/CSTL-1-landing-page to main. PR description should include:
- Stitch design URL and screen id
- List of changed files (see above)
- pytest -q output (paste)
- Links to artifacts/screenshots
- Any design deviations with a short justification

Thank you — the codebase is intentionally minimal to keep review focused on layout and accessibility.