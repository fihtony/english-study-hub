# English Study Hub (Constellation) — CSTL-4 Implementation

Project: English Study Hub — Constellation  
Jira: CSTL-4 — https://api.atlassian.com/ex/jira/4ccfddb8-4e94-4b5e-b335-16e5dded2645/rest/api/3/issue/10035 (key: CSTL-4)  
Figma (design): https://www.figma.com/design/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-?node-id=1-470&t=aEC6TlPdUDhDoSPm-0

Summary
-------
Implement the CSTL-4 Figma page using a minimal monorepo with:
- Backend: Express (Node >= 18)
- Frontend: React 18+ (Vite)
- Project is scaffolded as /server and /client (if not present)

This README documents developer setup, scripts, testing, build and PR guidance.

Tech stack
----------
- Node.js >= 18 (use .nvmrc to pin version)
- npm (or compatible)
- Backend: express, helmet, cors, dotenv, morgan
- Frontend: react 18+, react-dom, vite, react-router (for /cstl-4 route)
- Styling: CSS Modules or styled-components (chosen per client implementation)
- Tests:
  - Backend: jest + supertest
  - Frontend: jest + @testing-library/react
  - E2E: Playwright (recommended) or Cypress
- Linting & formatting: eslint, prettier

Repository layout (expected)
---------------------------
- /client                  — React app (Vite)
  - package.json
  - src/
    - pages/CSTL4Page.jsx
    - App.jsx (route /cstl-4)
    - components/
    - styles/
- /server                  — Express API
  - package.json
  - src/index.js
  - src/routes/health.js
  - src/middleware/*
- /e2e                     — Playwright tests (optional)
- .nvmrc
- package.json (root orchestrator)
- README.md

Prerequisites
-------------
- Node.js >= 18 (use nvm: nvm use)
- npm (>=8)
- Optional: global playwright dependencies (see Playwright docs)

Quick install & setup
---------------------
From repository root:

1. Install root + workspace deps:
   npm install && npm run install:all

Expected root scripts (examples):
- install:all — runs npm install in /client and /server
- dev — run server and client concurrently for development
- start — start production server (serves client build)
- test:all — run unit, integration and e2e tests

Local development
-----------------
Start both server & client (hot reload enabled):
npm run dev

Start server only (development):
npm run dev:server
# or
cd server && npm run dev

Start client only (development):
npm run dev:client
# or
cd client && npm run dev

Production build
----------------
Build the client:
cd client && npm run build

Build server (if applicable) — typically server is direct JS:
cd server && npm run build (if transpilation present)

Start production (serve built assets from server):
npm run start

APIs
----
Minimal required API endpoints:
- GET /api/health
  - Response: { "status": "ok", "timestamp": "<ISO>" }
  - Implemented with proper error handling and JSON response headers
- Additional endpoints may be added to support the page; follow REST conventions and validate input.

Security & OWASP guidance
-------------------------
- Use helmet to set safe response headers.
- Configure CORS with an allowlist in production.
- Validate and sanitize all incoming data on the server; do not embed user input directly into HTML/JS.
- Serve client assets with Content Security Policy (CSP) where applicable.
- Do not commit secrets; use .env and .env.example. Load via dotenv on server only.
- Use parameterized queries if any DB is introduced (not part of this scoped task).
- Escape/encode dynamic content on the client. Prefer React's default escaping; avoid dangerouslySetInnerHTML.

Implementation notes (CSTL-4)
----------------------------
High-level steps that will be executed in the feature branch:
1. Create branch:
   git checkout -b feature/CSTL-4_task-0002
2. Scaffold client (Vite + React 18+) in /client if missing.
3. Scaffold server (Express) in /server if missing.
4. Implement /client/src/pages/CSTL4Page.jsx and wire route /cstl-4 in App.jsx.
   - Follow Figma layout: header, hero, content blocks, footer
   - Exact spacing, colors, typography via CSS variables in styles/theme.css
   - Responsive breakpoints: mobile / tablet / desktop
5. Implement GET /api/health in /server/src/index.js (or /server/src/routes/health.js).
6. Add scripts to root package.json:
   - "install:all": "npm --prefix server install && npm --prefix client install"
   - "dev": "concurrently \"npm --prefix server run dev\" \"npm --prefix client run dev\""
   - "start": "node server/dist/index.js" or server start script
   - "test:all": run backend, frontend and e2e tests
7. Add tests:
   - Backend: jest + supertest for /api/health
   - Frontend: RTL tests for CSTL4Page renders and accessibility
   - E2E: Playwright test that navigates to /cstl-4 and checks key UI elements

Testing
-------
Run all tests:
npm run test:all

Run backend tests only:
npm --prefix server run test

Run frontend tests only:
npm --prefix client run test

Run E2E tests (Playwright):
npx playwright test
# or
npm --prefix e2e run test

Testing guidelines & expectations
- Backend tests use supertest and must assert JSON shape, 200 status, and error handling.
- Frontend tests must set app.testing = true for any Flask-style mention is N/A here; for React use jest + testing-library with render and memory router.
- E2E tests must validate responsiveness: capture and store screenshots for desktop, tablet, mobile.

Acceptance criteria (automated & manual)
---------------------------------------
- /cstl-4 route renders the page matching Figma's layout across breakpoints
- GET /api/health returns 200 and valid JSON
- All unit and integration tests pass
- Playwright/Cypress E2E test asserting hero content, a key CTA, and responsive breakpoints
- Accessibility: basic axe checks or ARIA attributes where applicable

PR process & checklist (required before requesting review)
----------------------------------------------------------
PR title:
feature/CSTL-4: Implement Figma page (task-0002)

PR branch:
feature/CSTL-4_task-0002 (created from main)

PR body must include:
- Jira ticket key and link (CSTL-4) — include this README's Jira link and ticket number
- Figma design URL (link provided above)
- Screenshots (attach): desktop, tablet, mobile (PNG). Place images in PR or artifacts/ and reference them.
- Test evidence: CI/test run logs, or local test run output pasted in PR.
- Scripts run for verification:
  - npm run lint
  - npm run test:all
  - npm run build
- List of intentionally deviated items with justification (if any)
- Steps to reproduce (how to run locally)
- Checklist (tick when done):
  - [ ] Lint passed
  - [ ] Unit + integration tests passed
  - [ ] E2E tests passed
  - [ ] Screenshots attached
  - [ ] Design URL included
  - [ ] Jira ticket linked
  - [ ] Co-authored-by trailer included in commits (Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>)

Branching & commit guidance
---------------------------
- Small, focused commits:
  - scaffold: create client/server
  - feat(client): add CSTL4Page and styles
  - feat(server): add /api/health
  - test: add unit/integration/e2e tests
  - chore: update scripts and README
- Use conventional commit style for clarity.
- Include the Co-authored-by trailer in the final commit message.

Artifacts & where to store
--------------------------
- Screenshots and test artifacts: artifacts/ (persisted)
- E2E traces/videos/screenshots: e2e/artifacts/ or Playwright configured output
- Test logs: artifacts/test-logs/

CI recommendations
------------------
- Run lint, unit, integration, and e2e tests in CI.
- Cache node_modules per workspace.
- Use Playwright CI images for E2E.
- Fail fast on lint or test failures.

Troubleshooting & notes
-----------------------
- If Figma rate limits or denies API access, implement per visible frames and annotate PR with the retry attempts and any missing assets.
- If a design asset (font, SVG) is unavailable, include a local fallback and document the substitution in PR.
- Do not commit secrets; add .env.example with required variables (PORT, NODE_ENV, CLIENT_URL, etc.)

Contact & escalation
--------------------
For design clarifications or asset requests, update the Jira ticket CSTL-4 with assumptions and attach the Figma frame references. If ambiguity prevents an acceptance criterion from being implemented, escalate in the Jira ticket and document the proposed approach in the PR.

Change log
----------
Initial README created/updated to cover CSTL-4 implementation, dev/test/build/run instructions, PR checklist, and security guidance.

License
-------
Project license should be set at repository root (e.g., MIT). Add LICENSE file as needed.

Thank you — follow the checklist above prior to requesting review.