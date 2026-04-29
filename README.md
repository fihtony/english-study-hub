English Study Hub — Landing Page (CSTL-1)
========================================

A minimal Flask-based landing page for the English Study Hub project. Implements a simple server-rendered homepage (header, hero, CTA, footer) per the Stitch design reference.

Tech stack
- Python 3.12
- Flask (server-side templates with Jinja2)
- Jinja2 templates
- pytest (tests)

Quick setup
1. Create and activate a virtual environment:
   - python -m venv .venv
   - source .venv/bin/activate
2. Install dependencies:
   - pip install -r requirements.txt

Run (development)
- Default (reads PORT env var if set):
  - export PORT=5000
  - python run.py
- Or directly:
  - python run.py
The server binds 0.0.0.0 and honors PORT via environment for CI/screenshots.

Run tests
- pytest -q

Project layout notes
- Templates: app/templates/
- Static assets (CSS, images, JS): static/ (project root /static/)
- Screenshot artifact (full-page, 1366x768): artifacts/screenshots/landing.png

Design reference (Stitch)
- Stitch screen URL used: https://stitch.withgoogle.com/projects/13629074018280446337/screens/f26700babdf44b4aa04826e7d3f37c28
- Stitch screen id: f26700babdf44b4aa04826e7d3f37c28

Branch, commit & PR conventions (CSTL-1)
- Branch name: feature/CSTL-1-landing-page
- Commit examples:
  - "CSTL-1: scaffold flask app and landing page"
  - "CSTL-1: add tests for root route and UI content"
  - "CSTL-1: include landing page screenshot artifact"
- Commit trailer: include Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com> when applicable

Pull Request description template
Include the following in the PR body:
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch screen URL and screen id used (above)
- Screenshot(s) path: artifacts/screenshots/landing.png
- Test run summary (copy of pytest -q output)
- Files changed (list)
- Intentional deviations from the design and justification (e.g., font fallbacks, color approximations)
- How to run locally and run tests

Testing & verification checklist
- [x] Start app and confirm GET / returns HTTP 200
- [x] Landing page includes header, H1 site title, hero text, primary CTA with accessible attributes
- [x] Pytest suite passes locally: pytest -q

Notes & security
- Templates are server-rendered with Jinja2. Avoid rendering untrusted HTML—escape user content by default.
- No database or external secrets are stored in the repo. Follow OWASP basics: validate inputs in future endpoints, use secure headers and HTTPS in production.

Support
- For review or design questions, reference the Stitch screen URL above.
- For CI or deployment concerns, ensure PORT is set by the environment and static/ assets are served by the chosen hosting (or via a fronting CDN).