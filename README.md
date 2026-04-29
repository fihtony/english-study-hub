# english-study-hub
English Study Hub - a test app from Google Stitch

Project summary
---------------
Minimal Flask-based landing page for the "English Study Hub" (CSTL-1). Implements a small, secure, server-rendered site scaffolded for development and CI.

Tech stack
----------
- Python 3.12
- Flask (server-side rendering)
- pytest for tests
- coverage for test reporting

Quickstart (developer)
----------------------
1. Create & activate virtualenv
   python -m venv .venv
   . .venv/bin/activate

2. Install dependencies
   pip install -r requirements.txt

3. Run dev server
   - Preferred (entry point):
     python run.py
     The run.py entrypoint reads port from environment:
     PORT=int(os.environ.get("PORT", 5000))
   - Alternative:
     FLASK_APP=run.py flask run

4. Run tests
   pytest

What was scaffolded
-------------------
- run.py
- requirements.txt
- .gitignore
- app/
  - __init__.py            (create_app factory)
  - routes.py              (routes registered with blueprint or app)
  - templates/index.html   (Jinja2 template rendering GET /)
- static/
  - css/styles.css         (referenced from template with url_for('static', filename='css/styles.css'))
- tests/
  - test_app.py            (pytest tests using app.test_client())
- .work/
  - screenshots/landing-desktop.png
  - screenshots/landing-mobile.png
  - tests/test-results.txt

Important implementation notes
------------------------------
- The app follows the Flask factory pattern. Importing app.create_app is safe and does not start servers or perform heavy work.
- In app/__init__.py the Flask instance is created via:
  app = Flask(__name__,
              template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
              static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'))
  This ensures url_for('static', filename=...) resolves to /static/... reliably regardless of working directory.
- Tests use app.testing = True and app.test_client() to avoid network/listener side effects.
- Static CSS is served from top-level static/ so requests like /static/css/styles.css work in dev and prod.

Security & best practices
-------------------------
- Inputs are validated at boundaries; templates use Jinja2 autoescaping to prevent XSS.
- No direct DB or shell execution in the scaffold; follow OWASP recommendations if adding features (parameterized queries, CSRF protection for forms, secure session cookies).
- Dependencies pinned in requirements.txt for reproducible installs.

Requirements / pins (example)
-----------------------------
See requirements.txt for pinned versions (e.g., Flask==2.3.*, pytest==7.*, coverage==6.*). Adjust as needed, but CI expects pinned dependencies for reproducible builds.

Testing expectations (CI)
-------------------------
- Run: pytest --maxfail=1 -q
- Produce a textual test log saved to: .work/tests/test-results.txt
- Save screenshots to: .work/screenshots/landing-desktop.png and landing-mobile.png (for visual review)

PR / CI checklist (what to include in the PR)
----------------------------------------------
Branch name:
- feature/CSTL-1-landing-page

PR description must include:
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
  - Screen id: 45ac4478a1b7455f861d7377f92105e6
- Short summary of changes
- List of changed files (see "What was scaffolded")
- Run/test instructions (copy Quickstart)
- Attachments:
  - .work/screenshots/landing-desktop.png
  - .work/screenshots/landing-mobile.png
  - .work/tests/test-results.txt
- Note any intentional deviations from the Stitch design and justification

CI / workflow guidance
----------------------
- CI should:
  1. Create and activate venv (or use tox)
  2. pip install -r requirements.txt
  3. Run pytest and capture output to .work/tests/test-results.txt
  4. Fail the job on test failures
- A minimal GitHub Actions CI job is recommended to run the above steps on PRs.

Developer notes / follow-ups
---------------------------
- When adding routes that accept user input, add validation and unit tests for edge cases.
- Add CSRF protection if forms are introduced (Flask-WTF or similar).
- Serve static assets via a CDN or reverse proxy in production; current static/ is suitable for quick deploys.

License
-------
MIT (or your preferred license)

Contact / references
--------------------
- Jira: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1 (screen id: 45ac4478a1b7455f861d7377f92105e6)

(End of README)