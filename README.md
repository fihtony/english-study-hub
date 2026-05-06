# english-study-hub

English Study Hub - a test app from Google Stitch

## Overview
This repository contains a small React + Vite single-page app implementing a bare-bones Landing Page for the Constellation project. The UI is scaffolded per the Stitch screen and includes placeholders for assets and content.

Tech stack
- React + Vite
- Tooling: npm, Vite dev server, Jest + React Testing Library (for unit tests)

## Quickstart — local setup & common commands
Install dependencies:
npm install

Run development server (opens at http://localhost:5173):
npm run dev
(Visit http://localhost:5173 in your browser; Vite reports the exact URL.)

Build production bundle:
npm run build

Preview the production build locally:
npm run preview

Run unit tests:
npm test

Notes:
- package.json, index.html, and vite.config.js are present and wired for the commands above.
- The Vite dev server defaults to port 5173; use the PORT env only if your scripts are configured to read it.
- Environment flag used for asset availability: import.meta.env.VITE_ASSETS_DOWNLOADED === 'true' (set this in .env or CI as VITE_ASSETS_DOWNLOADED='true' to enable production assets).

## Project structure (key paths)
- index.html — Vite SPA entry
- package.json — scripts and dependencies
- vite.config.js — Vite configuration
- src/main.jsx — React bootstrap
- src/App.jsx — app shell
- src/components/Landing.jsx — landing page implementation
- src/styles.css — global design tokens & styles
- src/assets/ — images, logos, Stitch-provided assets (replace with production assets as noted below)
- src/components/__tests__/Landing.test.jsx — unit test for Landing component

## Replacing Stitch assets
Place official design/exported assets from the Stitch project into:
src/assets/

Replace placeholder-logo.png and other placeholders with the final images and SVGs. Keep filenames or update imports in components accordingly. The app checks the Vite env flag VITE_ASSETS_DOWNLOADED (import.meta.env.VITE_ASSETS_DOWNLOADED) to decide whether to use shipped placeholders or production assets — set that in your .env or CI build if assets are present.

Example (.env):
VITE_ASSETS_DOWNLOADED='true'

## Branching and workflow
Work for the landing page should be developed on the feature branch:
feature/landing-page

Suggested workflow:
1. Create a branch off main: git checkout -b feature/landing-page
2. Implement and verify locally with npm run dev and npm test
3. Open a draft PR referencing the CSTL-1 ticket

## Jira / Ticketing
Ticket: CSTL-1

Programmatic API URL (for automation integrations):
https://api.atlassian.com/ex/jira/4ccfddb8-4e94-4b5e-b335-16e5dded2645/rest/api/3/issue/10000

Browse URL: attach the canonical Jira browse URL for CSTL-1 when available (do not fabricate).  
TODO: finalize acceptance criteria and attach the canonical Jira browse URL for CSTL-1 when available.

## Accessibility, design & surface token discipline
- Use the design tokens defined in src/styles.css for surface/background colors (surface, surface-container, primary, inverse-surface, etc.). Do not introduce black (#000000), default browser backgrounds, or transparent backgrounds for full-width page bands; header/hero/footer must use explicit design surface tokens.
- Ensure semantic structure (<header>, <main id="main" role="main">, <footer>), keyboard navigability, focus outlines, and meaningful ARIA attributes only where appropriate.
- Add empty/loading/error states for components that fetch data later.

COLOUR & SURFACE DISCIPLINE (important)
- Full-width bands (headers, hero/title wrappers, footers) must use explicit surface tokens from src/styles.css (e.g., --bg-header, --bg-hero, --bg-footer). Do not fall back to black or transparent. Verify hex values against the design token palette in the stylesheet.

## Tests
- Unit tests use Jest + React Testing Library. Run with:
npm test
- Example test target: src/components/__tests__/Landing.test.jsx verifies key bands and accessible text. Set app.testing = True in test setup if necessary (test harness uses app.test_client pattern where applicable for any server tests).

## Contribution / Code quality
- Follow existing code patterns in src/.
- Run tests before pushing: npm test
- Keep accessibility, responsive layout, and design-surface token usage consistent with the stylesheet tokens in src/styles.css
- Use import.meta.env for Vite environment variables (do not use process.env directly).

## Security & best practices
- No secrets or credentials should be committed.
- Sanitize and optimize static assets before committing. Avoid injecting untrusted content into the DOM.
- Follow OWASP guidance for frontend apps (escape user data, use CSP via server when applicable, avoid inline scripts/styles where possible).
- CI builds should validate linting and tests.

## Validation & local QA checklist
- Run npm install then npm run dev and confirm dev server loads at http://localhost:5173
- Run npm test and fix any failing tests
- Run npm run build && npm run preview and verify static preview works
- Replace Stitch assets in src/assets/ and confirm import.meta.env.VITE_ASSETS_DOWNLOADED is set to 'true' in your environment before building to ensure production assets are used

## Change log / notes
- This README was updated to state the explicit tech stack (React + Vite), clarify asset placement (src/assets/), list required commands (npm install, npm run dev, npm run build, npm run preview, npm test), and declare the feature branch (feature/landing-page).
- TODO: finalize acceptance criteria and attach the canonical Jira browse URL for CSTL-1 when available.

## License
See repository root for license information (if any).