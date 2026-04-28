# Server README

This folder contains the Express backend for the Constellation project. It provides a minimal, production-ready API surface used by the React frontend. Follow the instructions below to run, test, and ship the server.

Design / Ticket
- Jira: CSTL-4
- Figma design: https://www.figma.com/design/gxd2LNayM2hh3V3qTlcyPF/Website-Wireframes-UI-Kit--Community-?node-id=1-470&t=aEC6TlPdUDhDoSPm-0
- Branch to create for the work: feature/CSTL-4_task-0002
- PR title template: feature/CSTL-4: Implement Figma page (task-0002)

Requirements
- Node.js >= 18 (use .nvmrc in repo root to pin)
- npm (or yarn)
- Recommended globally: pm2 (for production) or Docker

Quick — run server alone (development)
1. Open terminal:
   cd server && npm install && npm run dev
2. Server will listen on the port defined by PORT environment variable (defaults to 5000).
   Example:
   PORT=5000 npm run dev

How to run tests
- In server folder:
  npm test
- To run a specific test file:
  npx jest server/src/routes/health.test.js

Important scripts (package.json)
- npm run dev — start development server with auto-reload (nodemon)
- npm start — production start (node ./dist/index.js or node ./src/index.js depending on build)
- npm run build — optional transpile/build step (if present)
- npm test — run unit/integration tests (Jest + supertest)
- npm run lint — run linter (ESLint) if configured

Environment variables
- Copy server/.env.example to server/.env and set values.
- Common variables:
  - PORT (default 5000)
  - NODE_ENV (development | production | test)
  - LOG_LEVEL (info | warn | error | debug)
  - RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX (for rate limiting)
- The server loads .env via dotenv in development. Never commit secrets.

Health check
- Basic health endpoint: GET /api/health
  - Response: 200 OK { "status": "ok", "uptime": <seconds>, "timestamp": "<ISO>" }
- Use to verify deployment and readiness probes.

Security best practices (production checklist)
- Use helmet middleware to set secure HTTP headers.
- Enable strict CORS policy: whitelist exact origins used by the client; do NOT use wildcard in production.
- Enforce rate limiting on public endpoints (express-rate-limit).
- Validate and sanitize all user input (use express-validator or JOI). Always validate types and lengths; never trust client data.
- Avoid exposing stack traces in production (hide error details).
- Use HTTPS in front of the server (managed by reverse proxy / load balancer).
- Keep dependencies up-to-date. Run `npm audit` regularly and fix vulnerabilities.
- Do not store secrets in source code. Use environment secrets or secret managers.

Logging & monitoring
- Use structured logging (pino or Winston). Write logs to stdout/stderr and let aggregator collect them.
- Expose basic metrics if needed (Prometheus-compatible endpoint).
- Capture uncaught exceptions and unhandled rejections, flush logs, and exit gracefully (allow process manager to restart).

Graceful shutdown
- On SIGINT/SIGTERM, close server, drain connections and finish inflight requests before exit.
- Ensure DB connections or long-lived resources are closed before exit.

Testing
- Unit tests: Jest + @testing-library for business logic.
- Integration tests: Jest + supertest for API endpoints (server/src/**.test.js).
- E2E: Playwright or Cypress should run against the running dev server; use port set by PORT environment variable.
- CI should run linter, tests, and (optionally) build step.

Docker
- Example:
  docker build -t constellation-server:latest .
  docker run --rm -p 5000:5000 -e PORT=5000 -e NODE_ENV=production constellation-server:latest
- Ensure Dockerfile sets NODE_ENV=production and does a non-root user run, health check, and multi-stage build to reduce image size.

CI / CD
- CI pipeline should:
  - Install dependencies (npm ci)
  - Run lint (npm run lint)
  - Run tests (npm test)
  - Build artifacts (npm run build) if applicable
  - Publish or build Docker image
- Include test coverage threshold checks where appropriate.

Repository layout (server/)
- server/package.json
- server/.env.example
- server/src/index.js         — Express app entry (reads PORT from env, registers middleware, routes, graceful shutdown)
- server/src/routes/*         — Route definitions (e.g., /api/health)
- server/src/middleware/*     — Custom middleware (errors, logging)
- server/src/tests/*          — Jest + supertest tests (e.g., routes/health.test.js)
- server/jest.config.js       — Jest configuration
- server/.nvmrc               — Node version (if present at root; ensure consistency)

PR checklist (must pass before requesting review)
- Branch created from main: feature/CSTL-4_task-0002
- All new code linted and lint issues fixed
- All tests passing: npm test (include server and client tests in CI)
- Attach screenshots: desktop, tablet, mobile (for the implemented page)
- PR body must include:
  - Jira ticket: CSTL-4
  - Figma URL (above)
  - Short implementation summary (3–5 bullets)
  - Test results (paste CI output / coverage summary)
  - List of intentional deviations (if any) with justification

Troubleshooting
- PORT already in use: pick another free port or kill conflicting process.
- Missing .env values: copy .env.example and populate required secrets.
- Tests failing due to environment: ensure NODE_ENV=test when running server tests; ensure test DB (or mocked services) available.
- If you run into dependency issues, remove node_modules and lockfile and reinstall:
  rm -rf node_modules package-lock.json && npm install

Contact / Support
- For design clarifications refer to the Figma link.
- For acceptance criteria or scope changes, comment on Jira ticket CSTL-4.
- For infra / deployment questions, tag the DevOps team and include CI logs.

Development notes & expectations
- The backend is intentionally minimal for this task: provide a robust health endpoint, secure defaults, and a clean structure so features can be added without violating OWASP guidance.
- Keep API contracts documented and stable; use versioned routes (e.g., /api/v1/...) when adding breaking changes.
- Follow semantic versioning for releases.

Example curl to verify health endpoint
curl -fsS -X GET "http://localhost:5000/api/health" | jq

Thank you — follow the PR checklist above and include the Figma link and screenshots in the PR description before requesting review.