# English Study Hub

A premium academic English learning platform built with React and Vite.

## Project Overview

Implementation of the "Landing Page (Bare-bones)" design from Google Stitch (Screen ID: 45ac4478a1b7455f861d7377f92105e6).

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Plain CSS with design tokens
- **Testing**: 
  - Unit tests: Vitest + jsdom + @testing-library/react
  - E2E tests: Playwright
- **Development**: Node.js

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   ├── __tests__/
│   │   │   └── LandingPage.test.jsx
│   │   └── styles/
│   │       ├── Hero.css
│   │       ├── Features.css
│   │       ├── CTA.css
│   │       └── Footer.css
│   ├── pages/
│   │   └── LandingPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── e2e/
│   └── landing.spec.js
├── docs/
│   └── evidence/
├── index.html
├── vite.config.js
├── vitest.config.js
├── playwright.config.js
└── package.json
```

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server (http://localhost:5173)
npm run dev
```

## Testing

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui
```

### E2E Tests

```bash
# Run E2E tests (requires dev server running)
npm run test:e2e

# Run tests in headed mode (see browser)
npm run e2e:headed
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

The implementation uses a comprehensive design token system with:

- **Colors**: Primary, secondary, tertiary, error, surface variants
- **Typography**: H1, H2, H3, body-ui, body-reading, button, label-caps
- **Spacing**: Stack (sm, md, lg), gutter, margin, section padding
- **Border Radius**: Consistent scale (0.125rem - 0.75rem)
- **Fonts**: Work Sans (UI), Newsreader (reading content)

All tokens defined as CSS custom properties in `src/index.css`.

## Implementation Notes

- All major text and design elements include `data-stitch-id` attributes for design traceability
- Fully responsive design with mobile, tablet, and desktop breakpoints
- Accessibility-focused with semantic HTML and ARIA-compatible components
- Test coverage includes rendering, content verification, and viewport-specific screenshots

## Evidence

- Unit test results: 8/8 passing
- E2E test results: 10/10 passing  
- Screenshots saved to `docs/evidence/`:
  - Desktop (1280x720)
  - Tablet (768x1024)
  - Mobile (375x667)

## Related Resources

- [Jira Ticket: CSTL-1](https://jira.example.com/CSTL-1)
- [Google Stitch Design](https://stitch.withgoogle.com/projects/13629074018280446337)
- [Repository](https://github.com/fihtony/english-study-hub)
