# English Study Hub

Landing Page (Bare-bones) implementation for CSTL-1 — a lightweight React + Vite app implementing the Google Stitch design "Landing Page (Bare-bones)".

Stitch reference
- Project: https://stitch.withgoogle.com/projects/13629074018280446337
- Screen ID: 45ac4478a1b7455f861d7377f92105e6
- Feature branch: feat/CSTL-1/landing-page
- Jira ticket: CSTL-1 (https://tarch.atlassian.net/browse/CSTL-1)

Tech stack
- React (UI)
- Vite (dev server / build)
- Jest + React Testing Library (unit)
- Playwright (end-to-end / screenshots)
- Node.js (>=16 recommended), npm

Quickstart (local development)
1. Clone the repo and checkout feature branch:
   - git clone https://github.com/fihtony/english-study-hub.git
   - cd english-study-hub
   - git checkout -b feat/CSTL-1/landing-page

2. Install dependencies (CI-friendly)
   - npm ci

3. Start dev server
   - npm run dev
   - Open http://localhost:5173/ (Landing Page reachable at `/` — or `/landing-barebones` if the app routing differs; the default route is `/`)

Build (production)
- npm run build
- Preview production build:
  - npm run preview

Tests
- Unit tests (Jest / React Testing Library)
  - npm run test
- E2E tests (Playwright)
  - npm run test:e2e
- Run both:
  - npm run test:all

Playwright / E2E artifacts
- Playwright configuration captures two screenshots:
  - docs/evidence/screenshot-1024x768.png
  - docs/evidence/screenshot-375x812.png
- Test logs and summary:
  - docs/evidence/test-summary.txt

Fetch Stitch JSON (optional — requires STITCH_TOKEN)
If a Stitch API token is available, fetch the screen JSON and save it to the evidence folder. Example (bash):

1) Set token in your environment (do NOT commit your token):
   - export STITCH_TOKEN="ya29.your_token_here"

2) Fetch screen JSON:
   - mkdir -p docs/evidence
   - curl -fSL -H "Authorization: Bearer $STITCH_TOKEN" "https://api.stitch.google/v1/projects/13629074018280446337/screens/45ac4478a1b7455f861d7377f92105e6" -o docs/evidence/screen-45ac4478.json

3) (Optional) Fetch thumbnail/thumbnail export if the API supports it:
   - curl -fSL -H "Authorization: Bearer $STITCH_TOKEN" "https://api.stitch.google/v1/projects/13629074018280446337/screens/45ac4478a1b7455f861d7377f92105e6/thumbnail" -o docs/evidence/design-reference.png

If fetching fails due to permissions, the repo includes a placeholder hero at src/assets/hero-placeholder.png and docs/evidence/design-reference.png will include a link to the Stitch screen.

What was added (file summary — feature branch)
- src/pages/LandingBarebones.jsx — React component implementing the Stitch Landing Page (Bare-bones)
- src/pages/LandingBarebones.css — component styles and design token variables
- src/assets/hero-placeholder.png — placeholder hero image used when Stitch image unavailable
- src/tests/unit/LandingBarebones.test.jsx — unit tests (React Testing Library)
- e2e/tests/landing.spec.js — Playwright e2e test (captures screenshots)
- e2e/playwright.config.js — Playwright configuration
- docs/evidence/
  - screenshot-1024x768.png
  - screenshot-375x812.png
  - screen-45ac4478.json (if STITCH_TOKEN used)
  - design-reference.png (if fetched)
  - test-summary.txt

PR / Commit guidelines (required)
- Branch name: feat/CSTL-1/landing-page
- Commit message example:
  - CSTL-1: Add Landing Page (Bare-bones) component and tests
  - Include Co-authored-by trailer when creating commits via tooling:
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

PR description template (copy into PR body)
- Title: CSTL-1: Landing Page (Bare-bones)
- Summary: Implements the Stitch "Landing Page (Bare-bones)" design as a React page. Includes unit and e2e tests, screenshots, and evidence artifacts.
- Stitch reference:
  - Project URL: https://stitch.withgoogle.com/projects/13629074018280446337
  - Screen ID: 45ac4478a1b7455f861d7377f92105e6
- Files changed: (list of changed files — see README "What was added")
- Test summary: attach or paste contents of docs/evidence/test-summary.txt including `npm ci && npm run test` and `npm run test:e2e` outputs
- Evidence:
  - docs/evidence/screenshot-1024x768.png
  - docs/evidence/screenshot-375x812.png
  - docs/evidence/screen-45ac4478.json (if available)
  - docs/evidence/design-reference.png (if available)
- Accessibility & notes:
  - Semantic landmarks used (main, header)
  - Alt text provided for hero image
  - CTA is keyboard-focusable and has discernible label
- Deviations (if any): Document missing assets or any deliberate visual deviations here with justification.
- Review checklist:
  - [ ] Unit tests pass locally
  - [ ] E2E screenshots captured and attached
  - [ ] Build completes (npm run build)
  - [ ] Stitch JSON (screen-45ac4478.json) attached if token available
  - [ ] PR references CSTL-1 and includes Stitch project and screen id

Design / Implementation notes
- Colors and surfaces use CSS design tokens defined in src/index.css (do not introduce black/transparent backgrounds for full-width sections). See CSS variables such as --surface, --surface-container, --primary for palette consistency.
- The landing component follows responsive breakpoints and accessible semantic markup.
- If Stitch JSON was fetched and included, any referenced assets were downloaded into src/assets/ and referenced with static imports. If assets are missing, placeholders are used and documented.

Troubleshooting
- If Playwright e2e fails in CI due to missing browser binaries:
  - npx playwright install --with-deps
- If port 5173 is in use, set PORT environment variable when running preview:
  - PORT=5173 npm run preview

Contacts
- Assignee / owner: Tony Xu (fihtony@gmail.com)
- Reviewers: front-end team

License
- See repository root LICENSE (if present)

Thank you — please open the PR from feature branch feat/CSTL-1/landing-page and include the PR description template above.