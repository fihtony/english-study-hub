# english-study-hub

Minimal Flask landing page for the English Study Hub project.

Implements CSTL-1: feature/CSTL-1-landing-page

Jira: CSTL-1  
Branch: feature/CSTL-1-landing-page

## Summary
Scaffolded a minimal Flask application (application factory + blueprint), a single landing template, static CSS, pytest tests, and helpers for local run & validation. See changed files section below and artifacts under .work/.

## Run & Test
Required: Python 3.12

Run the exact commands below to create a venv, install deps, start the server and run tests:

```bash
python3.12 -m venv .venv; source .venv/bin/activate; pip install -r requirements.txt; python run.py  # opens http://localhost:5000; pytest --maxfail=1 --disable-warnings -q
```

Note: The `python run.py` step starts a development server on http://localhost:5000. Tests use the Flask test client and do not require a running server.

## Changed / Added Files
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/css/styles.css
- run.py
- requirements.txt
- tests/test_app.py
- .gitignore
- README.md
- .work/pytest-output.txt
- .work/server-curl.txt
- .work/index-screenshot.png (optional)

## Validation evidence (.work/)
The following artifacts are stored under .work/ in this branch:
- .work/pytest-output.txt
- .work/server-curl.txt
- .work/index-screenshot.png

Quick verification commands used during validation (examples):
- pytest --maxfail=1 --disable-warnings -q  > .work/pytest-output.txt
- curl -sS -D - http://127.0.0.1:5000/ > .work/server-curl.txt

## PR
Title: feature/CSTL-1-landing-page: scaffold minimal Flask landing page

PR description should include:
- Link to Jira CSTL-1
- Links to .work artifacts (see list above)
- Local run & test instructions (copy the Run & Test section)

Reviewer checklist (include in PR):
- [ ] Tests pass (see .work/pytest-output.txt)
- [ ] GET / returns 200 and includes "English Study Hub"
- [ ] Template references /static/css/styles.css and CSS is served
- [ ] create_app is importable (from app import create_app)

## Notes & Risks
- Development server runs with debug=True for local development only. Do not use debug mode in production.
- The app is intentionally minimal to satisfy CSTL-1; follow-up tasks should add configuration, security headers, and CI integration.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>