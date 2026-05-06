import React from 'react';
import { render, screen, within, fireEvent, cleanup, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import LandingBarebones from '../../pages/LandingBarebones';

afterEach(() => {
  cleanup();
  // restore default window size to desktop after each test
  try {
    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });
  } catch (e) {
    // ignore in environments that don't support resize in test runner
  }
});

describe('LandingBarebones page', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LandingBarebones />
      </BrowserRouter>
    );

  test('renders the main title (h1) and it contains non-empty text', () => {
    renderComponent();
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    // exact text may vary between design vs placeholder, assert it's non-empty and a string
    expect(typeof h1.textContent).toBe('string');
    expect(h1.textContent.trim().length).toBeGreaterThan(0);
  });

  test('renders a descriptive paragraph beneath the hero', () => {
    renderComponent();
    // prefer semantic <main> landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // find a descriptive paragraph inside main: choose a text node longer than a short CTA label
    const description = within(main).getByText((content) => {
      if (!content) return false;
      const trimmed = content.trim();
      // description should be a reasonably long sentence (heuristic)
      return trimmed.length > 20;
    });
    expect(description).toBeInTheDocument();
  });

  test('primary CTA exists and is enabled', () => {
    renderComponent();
    // CTA text varies by design; allow common alternatives (case-insensitive)
    const ctaRegex = /get started|start now|start learning|join now|learn now|explore/i;
    const cta = screen.getByRole('button', { name: ctaRegex });
    expect(cta).toBeInTheDocument();
    expect(cta).toBeEnabled();
  });

  test('responsive layout adjusts between desktop and mobile widths', () => {
    renderComponent();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // capture desktop (default) computed font-size for the heading
    const h1 = screen.getByRole('heading', { level: 1 });
    const desktopFontSize = parseFloat(getComputedStyle(h1).fontSize || '16');

    // simulate mobile
    act(() => {
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
    });

    // re-query computed styles after resize
    const mobileFontSize = parseFloat(getComputedStyle(h1).fontSize || '16');

    // Heuristic: mobile font-size should be less than or equal to desktop; prefer strictly less
    const fontSizeResponsive = mobileFontSize < desktopFontSize;

    // Also check for layout class changes or computed flex-direction change on the main element
    const classIndicatesMobile = /mobile|is-mobile|stack|column/.test(main.className);
    const flexDirectionIsColumn = getComputedStyle(main).flexDirection === 'column';

    const responsiveDetected = fontSizeResponsive || classIndicatesMobile || flexDirectionIsColumn;

    expect(responsiveDetected).toBeTruthy();
  });
});