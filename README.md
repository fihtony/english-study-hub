# english-study-hub
English Study Hub - a test app from Google Stitch

Short description
-----------------
A minimal, production-oriented Flask landing page implementing a bare‑bones interpretation of the Stitch design. Purpose: provide a small, testable scaffold for the "English Study Hub" landing page, suitable for local development, CI, and reviewer screenshots.

Tech stack
----------
- Python 3.12
- Flask (server)
- Jinja2 (templating)
- pytest (tests)
See requirements.txt for pinned versions.

Quick setup (UNIX / macOS)
--------------------------
1. Create and activate virtualenv:
   python3.12 -m venv .venv
   source .venv/bin/activate
2. Install dependencies:
   pip install -r requirements.txt
3. Set Flask entrypoint and run:
   export FLASK_APP=run.py
   flask run
   (App will bind to localhost:5000 by default; run.py reads PORT via int(os.environ.get("PORT", 5000)) for dynamic assignment.)

Windows (Command Prompt)
-----------------------
1. python3.12 -m venv .venv
2. .venv\Scripts\activate
3. pip install -r requirements.txt
4. set FLASK_APP=run.py
5. flask run

Windows (PowerShell)
--------------------
1. python3.12 -m venv .venv
2. .venv\Scripts\Activate.ps1
3. pip install -r requirements.txt
4. $env:FLASK_APP = 'run.py'
5. flask run

Running tests
-------------
- Run the test suite:
  pytest -q
- Tests cover:
  - create_app factory returns a Flask app and does not perform side-effects on import
  - GET / returns 200 and contains expected site title and CTA
  - Static CSS served at /static/css/styles.css and contains expected CSS rule(s)
  - Non-existent paths return 404
  - Template response Content-Type is text/html

Project layout (important files)
--------------------------------
- app/__init__.py       - application factory: create_app(config=None)
- app/routes.py         - blueprint / route definitions (GET /)
- app/templates/index.html - Jinja2 template for landing page
- static/css/styles.css - minimal Stitch-inspired stylesheet (served at /static/css/styles.css)
- run.py                - entrypoint exposing `app` and reading PORT from env
- requirements.txt      - pinned runtime/dev deps
- tests/                - pytest tests (test_app_factory.py, test_routes.py)
- .work/                - CI and reviewer artifacts (pytest output, screenshots, changed-files list)

Branch / PR notes
-----------------
- Working branch: feature/CSTL-1_task-0004_3
- PR target: main
- Commit message used for main implementation:
  "CSTL-1: Implement Landing Page (bare-bones) + tests

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
- Include the following in the PR description:
  - Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
  - Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337
  - Brief implementation notes (what was implemented, which files changed)
  - Tests added (list)
  - Intentional deviations (see below)
  - Evidence: attach pytest output, screenshots, and .work artifacts (path: .work/ in repo root)

Finding .work artifacts in the PR
-------------------------------
All reviewer artifacts are placed under the repository root directory .work/ and included in the PR. Example entries:
- .work/pytest-output.txt  — full pytest run output
- .work/screenshots/       — reviewer screenshots (index page, mobile/desktop)
- .work/changed-files.txt  — list of changed files included in the PR

Implementation notes and intentional deviations
-----------------------------------------------
- Goal: faithful, bare‑bones interpretation of the Stitch landing page:
  - Centered hero with site title "English Study Hub"
  - Short description paragraph
  - Primary CTA button (non-functional anchor)
  - Simple footer
  - Basic responsive behavior via CSS
- Intentional deviations:
  - Custom web fonts from the design are replaced with system fonts for simplicity and to avoid external network requests in tests.
  - No images or hero illustrations included (keeps asset footprint small).
  - Typography scale and colors approximate the Stitch tokens but are simplified to a small palette in static/css/styles.css.
  - Interactions are limited to non-JS fallback (no SPA behavior).
- Security & best practices:
  - App uses the Flask factory pattern (create_app) to avoid import-time side-effects.
  - Templates escape content by default (Jinja2).
  - No DB or user input accepted on the landing page, minimizing injection/XSS risks.
  - Tests run against app.test_client() only — no real network calls.

Testing & CI guidance
---------------------
- Ensure Python 3.12 is available in CI.
- Use the same commands as local:
  - pip install -r requirements.txt
  - pytest -q
- Capture pytest output to .work/pytest-output.txt and include screenshots of the rendered page for review.

Notes for reviewers
-------------------
- This implementation targets a minimal, reviewable baseline for CSTL-1. If additional fidelity (custom fonts, imagery, animations) is requested, follow-up work should add those assets and update tests accordingly.
- If merging into a repo that already contains a competing CSTL-1 implementation, prefer feature/CSTL-1_task-0004_3 as the authoritative branch unless the reviewer instructs otherwise.

Contact / further tasks
-----------------------
- For follow-up tasks (fonts, imagery, SEO metadata, or accessibility audits), open separate Jira tickets and link them from the PR.

Thank you — please run pytest locally (pytest -q) and review .work/ artifacts before approving the PR.