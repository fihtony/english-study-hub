# PR Evidence: .work/ artifacts and instructions

This document lists the required evidence artifacts to attach to the PR for the landing-page work (branch: feature/CSTL-1-landing-page). Place each artifact exactly as noted below under the repository so reviewers can find them easily.

Stitch design
- Stitch project URL: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- Stitch screen id: 45ac4478a1b7455f861d7377f92105e6

Jira
- Ticket: CSTL-1
- Jira URL: https://tarch.atlassian.net/browse/CSTL-1

Required artifacts (paths)
- Pytest output (plain text): .work/tests-pytest.txt
- Alternate/optional pytest copy (for downstream tools): tests/pytest-report.txt
- Coverage XML (optional): .work/coverage.xml
- Screenshots:
  - Desktop: .work/screenshots/desktop.png
  - Mobile: .work/screenshots/mobile.png
- CI workflow run link or id: .work/ci_run_link.txt
- PR body template (ready to paste): .work/pr_body_template.md
- Token substitution / notes: .work/token_substitution.txt

Commands to generate pytest output (recommended)
- Save human-friendly pytest output to .work/tests-pytest.txt:
  pytest --maxfail=1 -q --disable-warnings | tee .work/tests-pytest.txt
- Save pytest output also to tests/pytest-report.txt (optional, for some tools):
  pytest --maxfail=1 -q --disable-warnings | tee tests/pytest-report.txt
- Run pytest with coverage and save XML for CI tools:
  pytest --maxfail=1 -q --disable-warnings --cov=app --cov-report=xml:.work/coverage.xml | tee .work/tests-pytest.txt

Notes:
- Use --maxfail=1 to stop early on first failure in CI and shorten logs.
- Ensure the virtualenv / dependencies are installed:
  python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt

Taking screenshots (headless Chrome / Chromium)
- Start the app locally (PORT optional):
  PORT=5000 python run.py
- From the host machine (Linux/macOS) using Chrome/Chromium headless:
  - Desktop (1280×800):
    google-chrome --headless --disable-gpu --screenshot=.work/screenshots/desktop.png --window-size=1280,800 http://127.0.0.1:5000/
    OR
    chromium --headless --disable-gpu --screenshot=.work/screenshots/desktop.png --window-size=1280,800 http://127.0.0.1:5000/
  - Mobile (375×812):
    google-chrome --headless --disable-gpu --screenshot=.work/screenshots/mobile.png --window-size=375,812 http://127.0.0.1:5000/
- If headless Chrome is unavailable, capture screenshots manually and place them at the same paths.
- Ensure screenshots are PNG and full-page (if headless Chrome truncates, open in a browser and use devtools device toolbar to capture).

CI run link / id
- After the run completes in GitHub Actions, copy the workflow run URL and save it into:
  .work/ci_run_link.txt
  Example content:
  https://github.com/<owner>/<repo>/actions/runs/<run_id>
- If GitHub provides a numeric run id, include both the URL and run id on separate lines.

PR body template (.work/pr_body_template.md)
- Copy/paste this into the PR description and fill placeholders:

Title: Implement landing page — stitch screen 45ac4478 (CSTL-1)

Summary
- Implements a minimal Flask landing page matching the Stitch design (project: 13629074018280446337, screen: 45ac4478a1b7455f861d7377f92105e6).
- Branch: feature/CSTL-1-landing-page
- Jira: CSTL-1 — https://tarch.atlassian.net/browse/CSTL-1
- Stitch: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1 (screen id 45ac4478a1b7455f861d7377f92105e6)

Files changed
- run.py
- requirements.txt
- app/__init__.py
- app/routes.py
- app/templates/index.html
- static/css/styles.css
- tests/test_app.py
- .github/workflows/ci.yml
- .work/* (artifacts)

Artifacts attached (required)
- Pytest output: .work/tests-pytest.txt
- Coverage XML: .work/coverage.xml
- Screenshots:
  - .work/screenshots/desktop.png
  - .work/screenshots/mobile.png
- CI run link: .work/ci_run_link.txt

Acceptance checks performed locally
- Unit tests run with pytest (saved to .work/tests-pytest.txt)
- App started and index.html served with CSS (visual check)
- Desktop and mobile screenshots captured and saved

Intentional deviations (if any)
- Web fonts: if the Stitch export used proprietary fonts not available via Google Fonts, substituted with a close, web-safe stack. Rationale and exact substitutions are listed in .work/token_substitution.txt.

Token substitution and variable notes (.work/token_substitution.txt)
- PR text placeholders (substitute before opening PR):
  - {STITCH_PROJECT_URL} => https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
  - {STITCH_SCREEN_ID} => 45ac4478a1b7455f861d7377f92105e6
  - {JIRA_TICKET} => CSTL-1
- CI/Secrets:
  - Do NOT commit secrets into the repo.
  - If any environment-specific tokens are required for acceptance tests, provide them to CI via GitHub Actions Secrets and reference them in the workflow (do not hardcode).

Minimal reviewer checklist
- [ ] Confirm .work/tests-pytest.txt exists and contains a successful pytest run and coverage summary.
- [ ] Confirm screenshots exist at .work/screenshots/desktop.png and mobile.png and visually match the Stitch design.
- [ ] Confirm CI run link resolves and the GitHub Actions run passes.
- [ ] Confirm PR body includes Stitch URL and CSTL-1 Jira link and documents deviations.

Where to store artifacts (summary)
- Test output: .work/tests-pytest.txt
- Coverage XML: .work/coverage.xml
- Screenshots: .work/screenshots/desktop.png and .work/screenshots/mobile.png
- CI run link: .work/ci_run_link.txt
- PR body template: .work/pr_body_template.md
- Token substitution notes: .work/token_substitution.txt

Example quick workflow (local)
1. Create venv & install:
   python -m venv .venv && . .venv/bin/activate
   pip install -r requirements.txt
2. Run tests and save results:
   pytest --maxfail=1 -q --disable-warnings --cov=app --cov-report=xml:.work/coverage.xml | tee .work/tests-pytest.txt
3. Start the app:
   PORT=5000 python run.py
4. Capture screenshots:
   google-chrome --headless --disable-gpu --screenshot=.work/screenshots/desktop.png --window-size=1280,800 http://127.0.0.1:5000/
   google-chrome --headless --disable-gpu --screenshot=.work/screenshots/mobile.png --window-size=375,812 http://127.0.0.1:5000/
5. Copy GitHub Actions run URL to .work/ci_run_link.txt and open PR using .work/pr_body_template.md (fill placeholders).

If anything in this checklist cannot be produced (CI failure, missing fonts, runtime error), include:
- failing command
- error log excerpt (paste into .work/error_log.txt)
- whether the failure was auto-repairable or needs escalation

End.