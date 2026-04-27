# English Study Hub

English Study Hub — minimal Flask app for CSTL-1 (landing page).

---

## Requirements

- Python 3.12+ (python_requires: >=3.12)
- Pinned Flask in requirements.txt (e.g. `Flask==2.2.5`)
- Other runtime/test dependencies listed in `requirements.txt`

Install dependencies:
pip install -r requirements.txt

Run app:
python run.py

Run tests:
pytest -q

(Exact commands above must be used in CI and local verification.)

---

## Local run & test commands (exact)

1. Install dependencies
pip install -r requirements.txt

2. Run unit tests (quiet)
pytest -q

3. Start the server (development)
python run.py

Optional: capture test output and server curl evidence for PR artifacts
pytest -q 2>&1 | tee .work/pytest-output.txt
python run.py & sleep 1
curl -sS http://127.0.0.1:5000/ | tee .work/server-curl.txt
# Kill server if needed (use the appropriate method for your shell/OS)

Note: The repo includes `.work/` as an artifacts folder; add these files to the branch so PR contains proof-of-test.

---

## Branching and PR expectations

- All work for this ticket must come from branch:
feature/CSTL-1-landing-page

If your current branch name differs, rename and push:

# rename current branch locally to required name
git branch -m feature/CSTL-1-landing-page

# push to remote and set upstream
git push -u origin feature/CSTL-1-landing-page

If a remote PR already exists from a different branch, either:
- Rename your branch and push (preferred), or
- Open a new PR whose head branch is feature/CSTL-1-landing-page.

PR must be targeted at the repository's main integration branch (e.g., `main` or `develop`) as per team convention.

---

## PR body template (use this exact checklist; replace placeholders)

Jira: CSTL-1 — [link to ticket]

Summary:
Short summary of changes (what files added/modified and purpose).

Jira ticket: https://<JIRA_BASE>/browse/CSTL-1

Reviewer checklist:
- [ ] Confirm branch is feature/CSTL-1-landing-page
- [ ] Run `pip install -r requirements.txt`
- [ ] Run `pytest -q` and confirm tests pass
- [ ] Start server `python run.py` and inspect landing page at `/`
- [ ] Inspect these changed/added files: run.py, app/__init__.py, requirements.txt, README.md
- [ ] Confirm no top-level side-effects on import of app (importable via `from app import create_app`)

Artifacts (committed to branch or attached in PR):
- pytest output: .work/pytest-output.txt
- server curl output: .work/server-curl.txt

PR link:
<PR_URL_GOES_HERE>

Notes:
- Python requirement: >=3.12
- Flask pinned: Flask==2.2.5 (see requirements.txt)
- Ensure `app.__init__.py` does not start the server at import; server start occurs only in `run.py` under `if __name__ == '__main__':`.

---

## Jira workflow actions (required before requesting review)

1. Transition CSTL-1 to "In Progress".
2. When PR is created and tests pass, transition CSTL-1 to "In Review".
3. Add a Jira comment to CSTL-1 with the PR URL and mention that CI/tests passed.
   Include links (or paths) to artifacts:
   - .work/pytest-output.txt
   - .work/server-curl.txt

If using Jira API to automate this, include the API response (JSON or screenshot) as an artifact in `.work/jira-update.json` or similar.

---

## Implemented files (short summary)

- run.py
  - Entrypoint that imports create_app and starts Flask only when executed directly.
  - Ensures `python run.py` is the correct way to run the server in development.
- app/__init__.py
  - Exposes create_app() factory.
  - Must contain no side-effects at import time (no app.run or process spawn).
- requirements.txt
  - Pinned runtime and test deps. Includes `Flask==2.2.5` (example).
  - Python runtime requirement: >=3.12 noted here and in packaging metadata if present.
- README.md
  - This file: exact run/test commands, PR & Jira workflow, evidence guidance.

(If any of these files are missing or incorrect, update them on branch feature/CSTL-1-landing-page before creating the PR.)

---

## How tests were validated locally

1. Install packages: pip install -r requirements.txt
2. Run tests and save output: pytest -q | tee .work/pytest-output.txt
3. Start server and capture root response: python run.py & sleep 1; curl -sS http://127.0.0.1:5000/ | tee .work/server-curl.txt

Attach `.work/pytest-output.txt` and `.work/server-curl.txt` to the PR or commit them (preferred) to the PR branch so reviewers and CI can reference exact outputs.

---

## Notes about import safety and testing

- To make the Flask app importable by tests and other code without side-effects, `app/__init__.py` must only define a create_app() factory and not call app.run() at module scope.
- Server startup should be implemented in `run.py` under:
if __name__ == '__main__':
    app = create_app()
    app.run(...)

This ensures `from app import create_app` (or `import app`) used by pytest or other tooling does not start a server accidentally.

---

## Residual tasks / follow-ups

- Ensure `.work/pytest-output.txt` and `.work/server-curl.txt` are present on the PR branch (or attached to the PR).
- Confirm Jira transitions and comments were made; include API response or screenshots in `.work/` artifacts if automated.
- Reviewer to verify branch name, PR body checklist, and artifacts before merging.

---

Thank you — follow the exact commands and PR checklist above so reviewers can validate quickly.