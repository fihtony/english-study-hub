# STEP 0 — Framework detection & chosen implementation path

Date: 2026-04-27T13:43:50Z  
Branch to create: `feature/CSTL-1-landing`  
Jira: https://tarch.atlassian.net/browse/CSTL-1

Detection method
- Scan package.json for framework keywords ("next", "react"). Example command:
  - grep -Ei '"(next|react)"' package.json || true

Detection result (repo scan summary)
- Frontend framework detected: React (TypeScript)
- Evidence: repository metadata / project README and existing toolchain indicate `react + typescript` stack rather than Next.js.

Chosen implementation path
- Implement a React (CRA/React Router/TS) landing page at `/`:
  - Create: src/pages/LandingPage.tsx (React + TypeScript)
  - Update route registration (src/App.tsx or src/routes.tsx) to map `'/'` → `<LandingPage />` (use react-router-dom)
  - Create minimal CSS module: src/styles/LandingPage.module.css
  - Add test: src/pages/__tests__/LandingPage.test.tsx using Jest + React Testing Library (MemoryRouter to assert navigation to `/quiz`)

Build & test commands to run locally (CI)
- npm ci
- npm run build
- npm test -- --coverage
- npm run start

PR details
- Branch: feature/CSTL-1-landing
- PR title: "CSTL-1: Implement Landing Page (Bare-bones)"
- PR description should include:
  - Jira ticket link (above)
  - Summary of changes (LandingPage, route update, styles, tests)
  - How to run locally and test commands
  - Build & test output snippets

Fallback (if Next.js detected)
- Create pages/index.tsx implementing the same UI and use next/link for navigation to `/quiz`.
- Keep branch name the same.

Notes / risks
- If maintainers require Flask backend or a Next.js approach, escalate — this detection chose React based on repo metadata.