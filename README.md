English Study Hub — Landing Page (Bare‑bones)
=============================================

Project overview
----------------
This repository implements the "Landing Page (Bare-bones)" exported from Google Stitch (source of truth). The implementation target is a React + Vite single-page application with unit tests (Vitest + React Testing Library), Playwright E2E tests, and reviewer evidence artifacts committed to docs/evidence/.

Design & references
-------------------
- Stitch project: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- Stitch screen_id: 45ac4478a1b7455f861d7377f92105e6
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1 (CSTL-1)
- Repository: https://github.com/fihtony/english-study-hub

Tech stack
----------
- Frontend framework: React (functional components)
- Dev/build tool: Vite
- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright
- Styling: plain CSS (Stitch tokens mapped to CSS variables)
- Stitch assets location: src/assets/stitch/

Prerequisites
-------------
- Node.js 18+ (LTS recommended)
- npm 8+
- Git
- Optional (for Playwright): Browsers via npx playwright install

Branching & PR workflow
-----------------------
1. Clone the repo:
   git clone https://github.com/fihtony/english-study-hub
2. From the repository's default branch (e.g., main), create a feature branch:
   git checkout -b feature/CSTL-1-landing-page
3. Implement changes on that branch and push.
4. Open a Pull Request with title exactly:
   CSTL-1: Landing Page (Bare-bones)
   Base: main
   Head: feature/CSTL-1-landing-page

Install & run (exact commands)
------------------------------
From repository root:

- Install dependencies (prefer lockfile):
  npm ci
  OR (if no lockfile present)
  npm install

- Start dev server (hot reload):
  npm run dev

- Production build:
  npm run build

- Preview production build:
  npm run preview

- Run unit tests (Vitest + React Testing Library):
  npm run test

- Run Playwright E2E tests:
  1) Start the dev server in terminal A:
     npm run dev
  2) In terminal B:
     npm run test:e2e

- Install Playwright browsers (if needed):
  npx playwright install

Recommended package.json scripts
-------------------------------
Ensure package.json contains these scripts (or equivalent):

- "dev": "vite"
- "build": "vite build"
- "preview": "vite preview --port 5173"
- "test": "vitest"
- "test:coverage": "vitest --coverage"
- "test:e2e": "playwright test"
- "lint": "eslint . || true" (optional helper)

Stitch assets — download & placement
-----------------------------------
- Export/download all image/vector assets referenced in the Stitch screen (project_id=13629074018280446337, screen_id=45ac4478a1b7455f861d7377f92105e6).
- Place downloaded assets under:
  src/assets/stitch/
- Preserve exported filenames exactly (e.g., hero-background.png).
- For traceability, add src/assets/stitch/manifest.json mapping original asset_id → filename (optional but recommended).
- Images used in components must include descriptive alt text and data-asset-id when available.

Project structure (recommended)
-------------------------------
- src/
  - main.jsx                 ← app entry (import canonical landing.css once here)
  - App.jsx
  - pages/
    - LandingPage.jsx
  - components/
    - Landing/
      - Hero.jsx
      - Features.jsx
  - styles/
    - landing.css            ← full Stitch token map as CSS variables
  - assets/
    - stitch/                ← Stitch assets (images, svgs)
- tests/
  - LandingPage.test.jsx     ← unit tests (Vitest + RTL)
- playwright/
  - tests/
    - landing.e2e.spec.ts    ← E2E test(s)
- docs/
  - evidence/
    - design-reference.png
    - screenshot-1280x720.png
    - screenshot-375x667.png
    - test-logs.txt
    - (optional) playwright-trace.zip

Implementation & fidelity rules (must follow)
--------------------------------------------
- React must be used for the UI (no Next.js or alternatives).
- Landing page served at route: /
- All TEXT nodes from the Stitch export must appear verbatim in the DOM. Each text node must include a data-node-id attribute mapping to the Stitch node_id.
- Map Stitch style tokens into CSS variables in src/styles/landing.css (for example: --stitch-color-primary, --stitch-surface-container, --stitch-font-size-3xl, etc.). Do not use black/transparent fallbacks—full-width bands (header, hero, footer) must use explicit Stitch surface tokens.
- Import landing.css only once at the app entry (src/main.jsx) to avoid duplicate token definitions.
- Images must be loaded from src/assets/stitch/ and include alt text. When available include data-asset-id attributes.
- Accessibility: use semantic HTML (header, main, footer), keyboard-focusable CTAs with visible focus state, and image alt attributes.
- Tests:
  - Unit tests assert Stitch text nodes render verbatim and images exist in the DOM.
  - Playwright E2E tests verify loading, HTTP 200, visibility of the hero, and responsive snapshots at 1280x720 and 375x667.

Generating evidence & logs (required)
------------------------------------
Run these commands and capture combined outputs into docs/evidence/test-logs.txt (append where noted):

- npm ci 2>&1 | tee docs/evidence/test-logs.txt
- npm run build 2>&1 | tee -a docs/evidence/test-logs.txt
- npm run test 2>&1 | tee -a docs/evidence/test-logs.txt
- Start dev server (in another terminal):
  npm run dev
- Run Playwright E2E (in second terminal):
  npm run test:e2e 2>&1 | tee -a docs/evidence/test-logs.txt

Save screenshots to docs/evidence/:
- design-reference.png — Stitch design reference (exported from Stitch)
- screenshot-1280x720.png — implemented page at 1280x720
- screenshot-375x667.png — implemented page at 375x667
- (Optional) playwright-trace.zip — Playwright trace for debugging failing runs

PR body checklist (copy into PR description)
-------------------------------------------
- Branch: feature/CSTL-1-landing-page
- PR title: CSTL-1: Landing Page (Bare-bones)
- Jira ticket: https://tarch.atlassian.net/browse/CSTL-1
- Stitch design:
  - https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
  - screen_id: 45ac4478a1b7455f861d7377f92105e6
- Summary of changes (concise bullets)
- Exact commands run locally and outputs (attach docs/evidence/test-logs.txt):
  - npm ci
  - npm run build
  - npm run test
  - npm run test:e2e
- Evidence images (docs/evidence/):
  - design-reference.png
  - screenshot-1280x720.png
  - screenshot-375x667.png
- Testing summary:
  - Unit tests: pass/fail + summary
  - E2E tests: pass/fail + summary
  - Production build: success/failure
- Accessibility & QA notes
- Known deviations (if any) with justification
- Reviewer checklist:
  - [ ] Build passes: npm run build
  - [ ] Unit tests pass: npm run test
  - [ ] E2E tests pass: npm run test:e2e
  - [ ] docs/evidence/ contains required screenshots and test-logs.txt
  - [ ] Stitch node_ids present as data-node-id attributes on text nodes

Acceptance criteria (for reviewer)
----------------------------------
- [ ] Landing page available at / and renders without runtime errors
- [ ] All Stitch text nodes present verbatim and annotated with data-node-id attributes
- [ ] Images loaded from src/assets/stitch/ with descriptive alt text and data-asset-id when available
- [ ] Colors and surfaces use explicit Stitch token CSS variables (no black/transparent fallbacks)
- [ ] Unit tests pass (npm run test)
- [ ] Playwright E2E tests pass (npm run test:e2e)
- [ ] Evidence files present in docs/evidence/

Testing notes & commands (examples)
----------------------------------
- Unit tests (Vitest + RTL):
  npm run test
  - Tests should run headlessly. Tests must assert visible text nodes and presence of assets.

- Playwright E2E:
  # Terminal A
  npm run dev
  # Terminal B
  npm run test:e2e
  - Playwright tests should verify:
    - HTTP 200
    - Primary heading and hero image visible
    - Footer uses stitch token-based background
    - Responsive snapshots for 1280x720 and 375x667 are created

Playwright troubleshooting
-------------------------
- If Playwright errors, ensure browsers are installed:
  npx playwright install
- Run a single test for faster debug:
  npx playwright test playwright/tests/landing.e2e.spec.ts --project=chromium

Notes about integration vs scaffolding
--------------------------------------
- If the repository already contains a React app (package.json, src/, vite.config.js), integrate the landing page into existing routing and components.
- If the repository is empty or not a React app, scaffold a minimal Vite + React app rooted at the repository root and implement the landing page there. Keep changes localized to required files.

Evidence & workspace artifacts
------------------------------
- Place screenshots and logs in docs/evidence/ and reference them in the PR description.
- Keep evidence artifacts PR-safe (PNG, TXT). Avoid committing very large raw assets or browser traces unless necessary; use compressed traces (playwright zip) if required.
- Include a short implementation summary and a list of changed files in the PR body.

Contact / owner
---------------
- Assignee/TL: Tony Xu — fihtony@gmail.com
- Jira: CSTL-1 — https://tarch.atlassian.net/browse/CSTL-1

Change log (this README)
------------------------
- v1.0 — Full project README with run/test instructions, Stitch references, evidence guidance, PR checklist, and acceptance criteria.