# English Study Hub (CSTL-4)

Project implementing the CSTL-4 design (Figma node) with an Express backend and React frontend (Vite). This repository includes server, client, automated tests (unit/integration), Playwright E2E visual checks, CI workflow and instructions to reproduce screenshots and artifacts.

Figma (source of truth)
- URL: https://www.figma.com/design/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-?node-id=1-470&t=aEC6TlPdUDhDoSPm-0
- Node ID: 1:470
- Visual evidence saved to: artifacts/figma/gxd2LNayM2hh3V3qTlcyPF/1_470/
  - cstl4_desktop.png (1280x800)
  - cstl4_mobile.png (375x812)

Quick overview
- Backend: Express.js serving API and production static client build
  - health endpoint: GET /health -> { status: "ok", uptime: <seconds> }
  - server exports app (module.exports = app) for tests
- Frontend: React + Vite SPA
  - Route /cstl-4 renders the CSTL-4 page implemented in client/src/pages/Cstl4Page.jsx
  - CSS Modules used for page styling and responsive breakpoints
- E2E: Playwright tests capture desktop and mobile screenshots, assert key elements and CTA behavior

Required Node version
- Node.js >= 18.x (LTS recommended). Use nvm: nvm use 18 (or install >=18.16.0).
- npm >= 9 recommended.

Environment variables
- PORT — integer port the Express server listens on. Default: 5000. (Server reads: int(process.env.PORT || 5000))
- NODE_ENV — production | development (must be set to production for production builds)
- API_URL — base URL for API (optional; client defaults to same host)
- PLAYWRIGHT_HEADLESS — "1" or "0" to control Playwright headless mode during CI/local debugging

Repository layout (top-level)
- /server
  - index.js
  - routes/health.js
  - package.json (server:start, server:dev, server:test)
  - test/health.test.js (jest + supertest)
- /client
  - vite.config.js
  - package.json (client:dev, client:build, client:test)
  - src/
    - main.jsx
    - App.jsx (react-router configured)
    - pages/Cstl4Page.jsx
    - pages/Cstl4Page.module.css
    - __tests__/Cstl4Page.test.jsx (React Testing Library)
- /e2e
  - playwright.config.ts
  - cstl4.spec.ts
- /artifacts
  - figma/gxd2LNayM2hh3V3qTlcyPF/1_470/
- package.json (root orchestrator scripts)
- .github/workflows/ci.yml

Local setup (root)
1. Clone repo
   git clone <repo> && cd english-study-hub

2. Install
   npm ci
   cd server && npm ci
   cd ../client && npm ci
   cd ..

Development (concurrently starts client + server)
- npm run dev
  - This runs client dev server (Vite) and server dev (nodemon) concurrently. Both use environment defaults:
    - Server reads PORT from env (int), default 5000.
    - Client proxied API to http://localhost:5000 in dev via Vite proxy (if set).

Direct server dev
- cd server
- npm run dev
  - Starts nodemon + node server on PORT

Client dev (Vite)
- cd client
- npm run dev
  - Visit: http://localhost:5173 (or port shown by Vite). SPA routes handled by react-router; /cstl-4 available.

Build & production server
1. Root: npm run build
   - Builds client (Vite), outputs to client/dist (client/build)
   - Copies or places client build where server will serve it (server/static or server/public depending on setup)
2. Start server in production mode
   PORT=5000 NODE_ENV=production npm run start
   - Server serves static client build and responds to API endpoints.

Scripts (root)
- npm run dev          -> start client+server for development (concurrently)
- npm run build        -> build client and prepare server static assets
- npm run start        -> start server (production)
- npm test             -> runs both server tests and client tests
- npm run e2e          -> run Playwright E2E tests (CI-friendly, noninteractive)
- npm run lint         -> code style checks (if present)

Server tests (Jest + Supertest)
- cd server
- npm run test
  - Tests include:
    - /health returns 200 and JSON { status: "ok", uptime: Number }
    - unsupported methods return 404
    - a simulated internal error route (mocked) returns 500 for coverage

Client tests (Vitest or React Testing Library + Jest)
- cd client
- npm run test
  - Tests assert:
    - /cstl-4 page renders main headings, hero, CTA, images and links
    - responsive classnames are applied (desktop/mobile)
    - CTA click triggers expected handler (navigation or mocked callback)

E2E tests (Playwright)
- Requirements: dev server running OR npm run e2e (script will start server in CI mode)
- Run: npm run e2e
  - Playwright configuration runs tests in a deterministic viewport:
    - Desktop: 1280x800 saved to artifacts/figma/gxd2LNayM2hh3V3qTlcyPF/1_470/cstl4_desktop.png
    - Mobile (iPhone 12 emulation): 375x812 saved to artifacts/figma/gxd2LNayM2hh3V3qTlcyPF/1_470/cstl4_mobile.png
  - Checks:
    - Navigate to /cstl-4 and wait for main hero and CTA
    - Take screenshots and store in artifacts path above
    - Verify CTA is clickable
    - Optional: run axe accessibility check and fail CI on critical violations (if configured)

CI (GitHub Actions)
- Workflow file: .github/workflows/ci.yml
- Steps run:
  - Setup Node (version 18)
  - npm ci
  - npm run build
  - npm test
  - npm run e2e
  - Upload artifacts from artifacts/figma/** for review

Branching & PR process (CSTL-4)
- Branch base:
  - Fetch origin main and create branch:
    git fetch origin main
    git checkout -b feature/CSTL-4_task-0004_dev
  - If feature/CSTL-4_task-0004_1 exists, base on that:
    git checkout feature/CSTL-4_task-0004_1
    git checkout -b feature/CSTL-4_task-0004_dev
- Commit message format (required):
  - Example:
    CSTL-4: Implement CSTL-4 page + tests

    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
- PR description must include:
  - Figma URL and node id (1:470)
  - List of changes / new files
  - Screenshots (attach artifacts/figma/... pngs)
  - Acceptance checklist and intentional deviations (if any) with justification
  - Commands to reproduce locally:
    npm ci
    npm run dev
    npm run test
    npm run e2e

Design fidelity & deviations
- Implementation aims for pixel-accurate layout:
  - Uses CSS Modules, semantic HTML, accessible landmarks and ARIA where needed
  - Fonts: system/web-safe fallback if exact Figma font not available; document deviations in PR
- If automated Figma export fails due to rate-limits, screenshots under /artifacts are used for review; include timestamp and node id in PR.

Security & production hygiene
- Do not commit secrets. Use environment variables for config.
- Server is hardened:
  - CORS configured only for allowed origins in production (set via env)
  - Input validation and escaping on any user input (server endpoints not accepting raw HTML)
  - Use Helmet (recommendation) in production for secure HTTP headers
- Static client is served from server only after building (no dev-only proxies in production)

Acceptance checklist (CSTL-4)
- [ ] /cstl-4 route implemented and matches Figma node 1:470
- [ ] Server /health endpoint passes tests
- [ ] Client unit tests pass (page renders and interactions)
- [ ] Playwright E2E runs and produces cstl4_desktop.png and cstl4_mobile.png in artifacts path
- [ ] CI passes (build, tests, e2e)
- [ ] PR includes screenshots and deviation notes

Troubleshooting
- Port in use: supply a different port via PORT env var (integer). Example: PORT=6000 npm run start
- Playwright fails to launch: ensure dependencies installed (browsers via npx playwright install --with-deps) and PLAYWRIGHT_HEADLESS set appropriately.
- Tests time out in CI: increase jest/vitest timeout or debug locally to collect failing traces.

Useful commands (summary)
- Install all: npm ci
- Dev (server + client): npm run dev
- Build: npm run build
- Start production server: PORT=5000 NODE_ENV=production npm run start
- Run all tests: npm test
- Run E2E (captures screenshots): npm run e2e

Contact & ticket
- Jira: CSTL-4 (ticket ID 10035). Include the PR link in the ticket and attach artifacts.
- If ambiguities remain about layout, raise comment in the PR referencing the Figma node id 1:470 and add screenshots showing the discrepancy.

Notes
- This README is the source-of-truth for running and validating the CSTL-4 deliverable. For implementation details see server/ and client/ READMEs (if present) and the CI workflow file.
- Artifacts and evidence are persisted under: artifacts/figma/gxd2LNayM2hh3V3qTlcyPF/1_470/

Thank you — implementors and reviewers should follow the branch/commit rules and include the Co-authored-by trailer in commit messages.