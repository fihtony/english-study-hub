# Client README — Constellation (client)

Purpose
- Frontend for CSTL features (React + Vite). Implements Figma page CSTL-4.
- Use this doc for local dev, testing, styling, and updating design assets.

Requirements
- Node.js >= 18 (use .nvmrc at repo root)
- npm (or pnpm/yarn)
- Recommended: modern browser (Chromium/Firefox/WebKit for e2e)

Quickstart — run client alone
1. cd client
2. npm install
3. npm run dev
Open http://localhost:5173 (Vite default). To change port: PORT=3000 npm run dev

Run tests
- Unit & integration (Jest + RTL): from /client run
  npm test
- End-to-end (Playwright): from repo root or /client (see package.json)
  npx playwright test
- Server API tests (supertest) live under /server — run from /server:
  npm test

Run with backend
- Start server first (see /server/README.md)
- Set API base for dev:
  VITE_API_BASE_URL=http://localhost:4000 npm run dev
- Or use root orchestrator script (if present) to start both concurrently.

Build & deploy
- Production build:
  npm run build
- Preview production build locally:
  npm run preview
- CI should run npm ci, npm run build and publish static output.

Where to update Figma assets & styles
- Figma design (source): https://www.figma.com/design/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-?node-id=1-470&t=aEC6TlPdUDhDoSPm-0
- Visual assets / svgs: client/src/assets/ — add optimized SVGs or images here.
- Theme variables (colours, type, breakpoints): client/src/styles/theme.css
- Page-specific styles: client/src/styles/CSTL4.module.css (CSS Modules)
- Components: client/src/components/* (Header.jsx, Hero.jsx, ContentBlock.jsx, Footer.jsx)
- Main page: client/src/pages/CSTL4Page.jsx and route at /cstl-4 in client/src/App.jsx

Design & accessibility notes
- Follow Figma tokens in theme.css; keep contrast and accessible font sizes.
- Use semantic HTML and aria-* attributes in components.
- Sanitize any user-provided content before rendering (avoid dangerouslySetInnerHTML).

Testing & QA strategy
- Unit tests cover component rendering and props.
- Integration tests mount CSTL4Page and assert responsive breakpoints.
- API tests ensure /api/health and client-server interactions.
- E2E verifies navigation, CTA behavior, and responsive snapshots (desktop/tablet/mobile).

Branching, PR & Jira
- Feature branch: feature/CSTL-4_task-0002 (from main)
- PR title: feature/CSTL-4: Implement Figma page (task-0002)
- PR body must include:
  - Jira: CSTL-4
  - Figma URL (above)
  - Screenshots (desktop/tablet/mobile)
  - Test run summary and any deviations from Figma with justification

Troubleshooting
- Port conflicts: change PORT env for dev
- Environment vars: Vite expects VITE_* for client runtime vars
- If Figma rate-limited when retrieving assets, attach exported assets to the PR and document retry attempts in the PR body.

Contacts
- Ping the CSTL Jira ticket (CSTL-4) for design clarifications.
- For infra or CI issues, contact the DevOps team and include logs (build/test).