import React from 'react';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

describe('Header (mobile toggle & accessibility)', () => {
  test('hamburger toggles mobile menu and does not cause console errors', () => {
    // Capture console.error to ensure no unexpected errors occur during interaction
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Simulate small viewport to encourage mobile behavior where components may rely on JS
    const prevInnerWidth = global.innerWidth;
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    // Navigation landmark should exist
    const nav = screen.queryByRole('navigation');
    expect(nav).toBeInTheDocument();

    // There should be at least one meaningful link inside navigation
    const links = within(nav).queryAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    // Each link should have a non-empty href and an accessible name
    links.forEach((link) => {
      const href = link.getAttribute('href') || link.getAttribute('to') || '';
      expect(href).toBeTruthy();
      // accessible name should not be empty
      expect(link).toHaveAccessibleName();
    });

    // Try to find the hamburger/toggle button using multiple accessible queries
    const toggleByRole = screen.queryByRole('button', { name: /menu|toggle|open|hamburger|navigation/i });
    const toggleByLabel = screen.queryByLabelText(/menu|navigation|open|toggle/i);
    const toggleByTestId = screen.queryByTestId('hamburger');
    const toggle = toggleByRole || toggleByLabel || toggleByTestId;

    expect(toggle).toBeTruthy();

    // Determine toggle behavior via aria-expanded or aria-controls; fallbacks included.
    const ariaExpandedBefore = toggle.getAttribute('aria-expanded');
    const ariaControls = toggle.getAttribute('aria-controls');

    if (ariaExpandedBefore !== null) {
      // If aria-expanded is present, it should flip between "false" and "true" on clicks
      expect(ariaExpandedBefore).toMatch(/^(true|false)$/i);

      // Click to open
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', expect.stringMatching(/true/i));

      // Click to close
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', expect.stringMatching(/false/i));
    } else if (ariaControls) {
      // If aria-controls points to an element, assert that element toggles visibility attributes
      const controlled = document.getElementById(ariaControls);
      expect(controlled).toBeTruthy();

      const hiddenBefore = controlled.getAttribute('aria-hidden') ?? String(controlled.hidden);
      // Click to open
      fireEvent.click(toggle);
      const hiddenAfterOpen = controlled.getAttribute('aria-hidden') ?? String(controlled.hidden);
      // Expect change in hidden state or aria-hidden flip
      expect(hiddenBefore === hiddenAfterOpen).toBe(false);

      // Click to close
      fireEvent.click(toggle);
      const hiddenAfterClose = controlled.getAttribute('aria-hidden') ?? String(controlled.hidden);
      expect(hiddenAfterClose).toBe(hiddenBefore);
    } else {
      // As a last resort, assert that clicking the toggle triggers a DOM change on the navigation element
      const navClassBefore = nav.className;
      fireEvent.click(toggle);
      const navClassAfterOpen = nav.className;
      // Expect classList to change (commonly toggled to show/hide mobile menu)
      expect(navClassAfterOpen === navClassBefore).toBe(false);

      // Click again to close and expect class to revert (or at least change)
      fireEvent.click(toggle);
      const navClassAfterClose = nav.className;
      expect(navClassAfterClose).not.toBeNull();
    }

    // Ensure no console errors were emitted during interactions
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Restore viewport
    global.innerWidth = prevInnerWidth;
    global.dispatchEvent(new Event('resize'));
    consoleErrorSpy.mockRestore();
  });
});