# English Study Hub

English Study Hub — a simple Flask-based landing site scaffold created to satisfy Jira ticket CSTL-1 and implement the initial landing page design (Stitch). This repository provides a minimal, production-quality Python 3.12 + Flask stack with tests and CI.

Jira ticket: https://tarch.atlassian.net/browse/CSTL-1  
Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1  
Design screen id referenced: 45ac4478a1b7455f861d7377f92105e6

Contents
- Brief project description and goals
- Tech stack and pinned dependencies
- Setup, run, and test instructions (explicit Python 3.12 commands)
- Files added/changed for this task
- CI notes and validation evidence checklist
- Visual deviations / follow-ups / next steps

Project summary
---------------
A small Flask application scaffold implementing a landing page ("English Study Hub") matching the Stitch design (hero, title, description, CTA, footer). The app uses an application factory (create_app) and serves static assets (CSS). Tests use pytest and app.test_client().

Tech stack
----------
- Language: Python 3.12 (required)
- Web framework: Flask (2.3.x)
- Tests: pytest (7.x)
- CI: GitHub Actions (example workflow included)

Pinned dependency examples (see requirements.txt)
- Flask==2.3.*
- pytest==7.*
- coverage (optional)

Project layout (files created/modified)
--------------------------------------
- run.py
- requirements.txt
- .gitignore
- app/__init__.py            (Flask factory: create_app)
- app/routes.py              (route: GET / -> renders index.html)
- app/templates/index.html   (landing page)
- static/css/styles.css      (design styles)
- tests/test_landing.py      (pytest tests)
- .github/workflows/ci.yml   (CI: install deps + run pytest)

Setup (local development)
-------------------------
Notes: These commands target Python 3.12 explicitly. Replace python3.12 with your chosen Python 3.12 binary if needed.

1. Create a virtual environment (explicit Python 3.12)
   python3.12 -m venv .venv

2. Activate (optional) and install dependencies
   On macOS / Linux:
   . .venv/bin/activate
   .venv/bin/pip install --upgrade pip
   .venv/bin/pip install -r requirements.txt

   (Alternatively run .venv/bin/pip directly without activating.)

3. Verify Python version
   .venv/bin/python -V
   # should show Python 3.12.x

Run the server (development)
----------------------------
Two supported methods:

Option A — run the included runner (recommended for development):
.venv/bin/python run.py
# run.py reads port from environment: int(os.environ.get("PORT", 5000))

Option B — use Flask CLI (ensure .venv is active and Flask is installed):
export FLASK_APP=run.py
.venv/bin/flask run --port 5000

Notes:
- run.py calls create_app() and only runs when executed as __main__.
- The app supports dynamic port assignment via the PORT environment variable to support container/CI environments.

Testing
-------
Run tests with pytest using the virtual environment's pytest binary:

.venv/bin/pytest -q

Test coverage and expectations:
- tests/test_landing.py contains:
  - test_index_status: GET / returns 200
  - test_index_content: response contains "English Study Hub" and CTA text
  - test_static_css_served: GET /static/css/styles.css returns 200 and contains expected CSS rule
  - test_factory_no_side_effects: importing create_app must not run a server or background tasks

Continuous Integration (GitHub Actions)
--------------------------------------
The provided workflow (.github/workflows/ci.yml) runs on pushes and PRs and executes:
- Set up Python 3.12
- python -m pip install -r requirements.txt
- pytest -q

Example CI commands (what the action runs):
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
pytest -q

Security and best practices
---------------------------
- Use the app factory pattern: app/__init__.py exports create_app(config=None) and must not perform side effects on import.
- Do not commit secrets. Use environment variables for sensitive configuration.
- Static templates are rendered server-side with Jinja2; ensure any user input is properly escaped (Flask/Jinja2 autoescape used by default).
- Dependencies pinned in requirements.txt to reduce supply-chain variability.
- Tests are isolated: they use app.test_client() and do not perform network calls.

Design fidelity and deviations
------------------------------
- The landing page implements a centered hero with title "English Study Hub", a short descriptive paragraph, a primary CTA, and footer to match the Stitch screen identified above.
- Where exact fonts, metrics, or proprietary assets were not available in the Stitch export, reasonable open-system fallbacks were used (system font stack, CSS color tokens approximating the design).
- Any deviations are documented in the PR body with annotated screenshots and justification.

Validation evidence (what to collect and attach in PR)
------------------------------------------------------
- Screenshot: rendered landing page in desktop resolution (attach to PR)
- Screenshot or log: pytest output showing passing tests
- CI run: link to GitHub Actions run with successful checks
- List of changed files (see "Project layout" above)
- Short note confirming Python version used (3.12.x) and that tests ran under .venv/bin/python

PR checklist (what the PR should include)
-----------------------------------------
- Reference to Jira ticket CSTL-1: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design link and screen id: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1 (screen id 45ac4478a1b7455f861d7377f92105e6)
- List of changed/added files
- Screenshots: rendered page and test/CI passing logs
- Notes about any visual deviations and why
- Request QA: "Ready for QA" instructions and minimal manual test steps

Post-merge actions
------------------
After merge, add a Jira comment referencing the merged PR URL, include test verification summary and screenshots, and transition the Jira ticket to Ready for QA / Done per the project workflow.

Support and contact
-------------------
For implementation questions or to flag scope changes, mention the Jira ticket CSTL-1 and add comments on the PR.

License
-------
Project follows the repository default (check repo root for LICENSE). If none present, contact maintainers to choose a license before public distribution.

Thank you — this scaffold is intentionally minimal so it can be extended.