FEATURE: CSTL-1 — Client README
Overview
A minimal React frontend was added under /client implementing a landing page at /. The page includes a header with the app name, a centered hero "Welcome to English Study Hub", and a "Start Quiz" CTA that navigates to /quiz.

Quick start (development)
1. From repo root:
   cd client
2. Install:
   npm install
3. Start dev server:
   npm run start
   - Dev server listens on http://localhost:3000 (default). If port differs, check console output.
4. Open http://localhost:3000/ to verify header, hero text, and CTA navigation to /quiz.

Scripts (package.json)
- npm run start   -> starts development server (CRA/Vite)
- npm run build   -> creates production build in client/build
- npm run test    -> runs unit tests (Jest + React Testing Library)

Testing
- Run: npm test
- Tests include src/pages/__tests__/LandingPage.test.tsx which asserts:
  - Header text present
  - Hero message present
  - CTA exists and navigates (Link simulated/clicked)
- To run once (no watch): npm test -- --watchAll=false

Production serving
1. Build: npm run build
2. Serve static build:
   - Option A: Use your backend to serve client/build as static assets.
   - Option B: Lightweight static server: npx serve -s build -l 3000
3. Verify production build serves index.html and client-side routing (SPA) is preserved: requests should fallback to index.html.

Branching, commits, PR
- Feature branch used: feature/cstl-1-landing-page
- Commit message to use: feat(CSTL-1): add bare-bones landing page
  Include trailer:
  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
- Open a PR against main (or master), title: feat(CSTL-1): add bare-bones landing page
- In PR description:
  - Reference ticket: CSTL-1
  - List acceptance criteria (header, hero text, CTA navigation, tests)
  - Provide verification steps and at least one screenshot or short screen recording showing the running page and the CTA navigating to /quiz
  - Request review from frontend owner

Notes & Reviewer checklist
- Verify npm install succeeds and npm test passes.
- Verify SPA routing: navigating directly to /quiz must load the quiz route (client-side router fallback).
- If port conflicts occur, adjust environment or specify PORT env var: PORT=3001 npm run start
- No backend changes were required; if your deployment serves client from a backend, ensure static middleware points at client/build.

Contact
For questions about this change or CI failures, comment on the PR and link the Jira ticket CSTL-1.