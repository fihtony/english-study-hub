# english-study-hub

English Study Hub — landing page scaffold for CSTL-1 (Bare-bones)

---

## JIRA
- Ticket: CSTL-1  
- Link: https://tarch.atlassian.net/browse/CSTL-1

---

## Branch
Create and work on the feature branch:
- Branch name: `feature/CSTL-1-landing-page`
- Create locally:
  - git checkout -b feature/CSTL-1-landing-page

---

## Python / Virtualenv (Python 3.12)
This project targets Python 3.12.

Create a reproducible virtual environment and activate for commands below:

- Create venv:
  - python3.12 -m venv .venv
- Activate (optional, recommended for interactive shells):
  - source .venv/bin/activate

Install dependencies:
- .venv/bin/pip install --upgrade pip
- .venv/bin/pip install -r requirements.txt

requirements.txt (expected minimal):
- Flask>=2.2.5
- pytest
- pytest-cov

---

## Run (development)
Two supported ways to run the dev server:

1) Using the provided runner:
- .venv/bin/python run.py
  - Runs the app on 127.0.0.1:5000 by default in development mode.

2) Using flask CLI:
- FLASK_APP=run.py .venv/bin/flask run
  - Or (shell):
    - export FLASK_APP=run.py
    - .venv/bin/flask run

Tip: Use `.venv/bin/python run.py` for a consistent dev start.

Verify server started:
- Example log lines: *" * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)"*

Verify endpoint (quick smoke):
- curl -fsS http://127.0.0.1:5000/  # should return 200 and HTML

---

## Endpoints to verify (Acceptance criteria)
- GET /  
  - HTTP 200 OK  
  - HTML contains <title>English Study Hub</title>  
  - Page shows a visible primary CTA labeled `Get Started` (anchor/button) — clickable and keyboard-focusable

Other expectations:
- Template uses semantic HTML (header, main, footer)
- Responsive layout (viewport meta)
- Accessible controls (alt attrs, focusable CTA)

---

## Tests
Run the pytest suite:

- .venv/bin/pytest --maxfail=1 -q

Expected tests (examples present in repo):
- tests/test_landing_page.py:
  - test_index_status_code -> 200
  - test_index_contains_title -> contains "English Study Hub"
  - test_index_has_cta -> contains "Get Started" and CTA href

Include test outputs in PR description.

---

## Files added / changed by CSTL-1 (expected)
- run.py
- requirements.txt
- .gitignore
- app/__init__.py
- app/routes.py
- templates/index.html
- static/css/style.css
- tests/test_landing_page.py
- README.md (this file)

If the repository already had a Flask app, the change should adapt existing structure rather than adding duplicate entrypoints.

---

## Git / Commit Guidelines
All commits implementing this feature MUST:
- Include the ticket key `CSTL-1` in the commit message.
- Include the Co-authored-by trailer exactly:

Example commit:
- git add ...
- git commit -m "CSTL-1: scaffold landing page (bare-bones)

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

Push and open PR:
- git push -u origin feature/CSTL-1-landing-page

PR title:
- CSTL-1: Landing Page (Bare-bones)

PR description SHOULD include:
- Link to JIRA: https://tarch.atlassian.net/browse/CSTL-1
- Short implementation summary
- How to run locally (commands above)
- pytest output (paste stdout)
- A screenshot or HTML snapshot of the landing page
- Server run log lines showing the app started

---

## PR Checklist / Evidence to attach
- Branch created: `feature/CSTL-1-landing-page` (include git log snippet)
- Commits & SHAs that implemented the feature
- Files changed list (see "Files added / changed")
- Test evidence: paste `.venv/bin/pytest --maxfail=1 -q` output
- Screenshot or HTML snapshot of the rendered landing page (attach to PR)
- Dev server run log lines (attach or paste)
- Jira comment added to CSTL-1 with the PR URL and brief progress note

Suggested PR description template:
- What: Bare-bones landing page with hero and CTA
- Why: Implements CSTL-1 (landing page)
- How to run: (copy commands from this README)
- Tests: (paste pytest output)
- Jira: https://tarch.atlassian.net/browse/CSTL-1

---

## CI / Policies
- Use Python 3.12 for local validation to match CI expectations.
- Do not commit the `.venv` directory. Ensure `.gitignore` contains:
  - .venv/
  - __pycache__/
  - .env

---

## Security & Accessibility Notes
- Avoid inline user-supplied HTML to mitigate XSS.
- Use Jinja2 autoescaping for template rendering.
- Semantic HTML and focusable CTA to meet basic accessibility guidance.
- Keep dependencies minimal and pinned in requirements.txt.

---

## If blocked / conflicts
If repository policies or CI require a different Python version or conflict with these instructions, create an INPUT_REQUIRED issue or comment in the Jira ticket describing the blocker and required decision.

---

Thank you — follow the steps above to set up, run, and validate CSTL-1 locally.