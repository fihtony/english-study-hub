# English Study Hub

A minimal Flask-based landing page implementation for the Constellation project (Jira: CSTL-1). Built for Python 3.12 with a simple factory-pattern Flask app and a responsive landing page derived from the Stitch design.

Stitch design (source-of-truth):  
https://stitch.withgoogle.com/projects/13629074018280446337?pli=1

Branch: feature/CSTL-1-landing-page  
Jira ticket: CSTL-1

---

## Requirements

- Python 3.12 (explicitly required)
- A POSIX-like shell for the examples below (see Windows note)
- requirements.txt (includes Flask and pytest)

---

## Local setup (Linux / macOS)

Run these commands from the repository root:

1. Create and activate venv (Python 3.12):
```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
python run.py
```
The app listens on 127.0.0.1:5000 by default. Open http://127.0.0.1:5000/.

---

## Local setup (Windows PowerShell)

```powershell
python3.12 -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

---

## Run tests

With the venv activated:

```bash
pytest -q
```

Tests use Flask's test_client() and import the application factory; they do not start a real server. See tests/test_app.py.

---

## Files changed / created for CSTL-1

- app/__init__.py — Flask application factory (create_app)
- app/routes.py — landing page route (GET /)
- app/templates/index.html — landing page template
- static/css/styles.css — minimal responsive styling
- run.py — local dev runner
- requirements.txt — pinned deps (Flask, pytest)
- tests/test_app.py — pytest tests
- README.md — this file
- .work/ (artifact directory created in PR) — screenshots and test output

---

## PR evidence (included in the pull request)

All evidence is stored under the `.work/` directory in the PR:

- `.work/screenshots/desktop.png` — desktop screenshot (approx. 1280×800)
- `.work/screenshots/mobile.png` — mobile screenshot (approx. 375×812)
- `.work/pytest-output.txt` — captured output from `pytest -q`
- PR description includes:
  - Jira ticket key (CSTL-1)
  - Stitch design URL
  - List of changed files (above)
  - Commands to run locally (copyable)
  - Test results summary
  - Links to screenshots and test output in the repo

---

## Design fidelity and intentional deviations

The landing page markup and CSS were implemented to match the Stitch design's layout, hierarchy, color palette, and spacing. Known and intentional deviations included in the PR notes:

- Web fonts from the design were not bundled; system UI fonts are used to avoid external network/font licensing/packaging complications. Use of system fonts improves local dev reproducibility. (If desired, follow-up PR can add licensed web fonts or @font-face assets.)
- Images and assets in the Stitch design were approximated with simple SVG/gradients or placeholders to keep repo size small. Exact pixel-perfect assets can be added later if approved.

---

## Security & best-practices notes

- The app uses a Flask application factory pattern to avoid side-effects at import time.
- No user-supplied content is rendered without escaping. Static templates and CSS are served from Flask's static folder.
- Tests do not open network ports or depend on external services.

---

## Validation & developer checklist before PR merge

- [ ] Confirm Python 3.12 is installed in CI/test environment
- [ ] Run the steps in "Local setup" and verify the site loads at `/`
- [ ] Run `pytest -q` and ensure all tests pass
- [ ] Inspect screenshots in `.work/screenshots/` to verify visual pass against Stitch design

---

## Follow-ups / deferred work

- Add exact design web fonts (licensed) and raster/vector assets exported from the Stitch project.
- Add more accessibility (a11y) audits and adjustments (e.g., skip links, more keyboard focus styles) as part of next iteration.
- Add CI pipeline entry to run `pytest` on push/PR and publish artifact screenshots if desired.

---

If anything in the Stitch design needs to be adjusted (missing assets, exported components), attach them to the Jira ticket CSTL-1 and they'll be applied in a follow-up PR.