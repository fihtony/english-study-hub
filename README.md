# English Study Hub — Landing Page (CSTL-1)

Project: English Study Hub landing page (Jira: CSTL-1)  
Design reference: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1

## Project description
A minimal, production-oriented Flask landing page for English Study Hub (CSTL-1). Implements a responsive hero/header, call-to-action, and static CSS assets. Built with the Flask factory pattern so the app is testable and import-safe.

## Tech stack
- Python 3.12
- Flask (>=2.3,<3)
- Jinja2 (bundled with Flask)
- pytest (for unit + integration tests)

## Repository layout (key files)
- run.py — development launcher (reads PORT from environment)
- app/__init__.py — Flask factory (create_app)
- app/routes.py — index route
- app/templates/index.html — Jinja2 template for landing page
- static/css/styles.css — page styles
- requirements.txt — pinned dependencies
- tests/*.py — pytest test suite
- .gitignore — standard Python ignores
- .work/screenshots/index.png — screenshot evidence (included in PR)

## Local setup (Python 3.12)
Create a virtual environment and install dependencies:
python -m venv .venv && .venv/bin/pip install -r requirements.txt

Activate the venv (optional, examples):
- macOS / Linux: source .venv/bin/activate
- Windows (PowerShell): .venv\Scripts\Activate.ps1

## Run (development)
Two options:
1) Direct (recommended for local dev):
python run.py
By default the app reads port from the environment: int(os.environ.get("PORT", 5000))

2) Using Flask CLI:
export FLASK_APP=run.py && flask run

When using option (1) you can set a port:
export PORT=8080 && python run.py

## Tests
Run the test suite with:
pytest -q

Notes:
- Tests import create_app from app and set app.testing = True
- tests verify factory has no side effects, GET / returns 200 and contains expected title/hero text, and static css is served

## Branching & commits
- Branch name for this work: feature/CSTL-1-landing-page
- Commit messages should be atomic and descriptive (e.g., "feat(app): add Flask factory and index route" / "test: add index route tests")
- PR title should include the Jira key: "CSTL-1 — Landing page (feature/CSTL-1-landing-page)"

## PR checklist / required evidence
Include the following in the PR body and .work/ folder:
- Jira: CSTL-1 (link to the ticket)
- Stitch design URL: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- pytest output: run `pytest -q` and paste output into the PR or add as `.work/pytest-output.txt`
- Screenshot of the rendered page (desktop width 1366px) saved at: `.work/screenshots/index.png`
- One-line note in PR: "CSS is intentionally minimal; source of truth is Stitch design URL."

Suggested PR description snippet:
"This PR implements CSTL-1: English Study Hub landing page. Design reference: [Stitch]. Tests included (pytest -q). Evidence: .work/pytest-output.txt and .work/screenshots/index.png."

## Design / implementation notes & deviations
Source of truth: Stitch design URL above. The implementation aims to match layout, spacing, and color hierarchy. Where Stitch exact values (fonts or hex tokens) were not available, the following intentional deviations were made:
- Font: system/stack font used instead of hosted Google font (reduces external network calls and simplifies testability).
- Colors: used a neutral Google-like palette for primary/accent colors (hex values chosen to be accessible and have sufficient contrast). Exact hex values are documented in static/css/styles.css.
- Images/illustrations: replaced with simple SVG/placeholder shapes for delivery speed and licensing safety. Future iterations can replace with production art from design assets.
- CSS scope: small, component-focused, avoids any global resets to minimize side-effects in consuming projects.

Justification: These deviations prioritize accessibility, simplicity for tests, and a small dependency surface for the initial sprint. Any exact-brand tokens can be applied in follow-up tasks.

## CI / automation notes
- CI should create Python 3.12 venv and run:
  - pip install -r requirements.txt
  - pytest -q
- Optionally run a lightweight HTML linter or accessibility checks in a later ticket.

## Security & best practices
- Flask factory pattern used to avoid side-effects at import time.
- Static assets are served via Flask static routing in development; production should use a proper static host or CDN.
- No user input is accepted on the landing page; templates are rendered server-side with Jinja2 autoescaping enabled by default.
- Dependencies are pinned in requirements.txt to limit supply-chain drift.

## Next steps / recommended follow-ups
- Integrate exact brand fonts and design tokens from the design system.
- Replace placeholder imagery with production assets.
- Add E2E visual regression tests (e.g., Percy or Playwright) in CI.
- Deploy static assets to a CDN and serve the app behind a WSGI server (gunicorn/uvicorn) for production.

If anything in this README conflicts with the Stitch design or Jira instructions, the Stitch design URL and Jira ticket CSTL-1 are authoritative.