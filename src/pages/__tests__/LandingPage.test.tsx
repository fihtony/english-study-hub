import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LandingPage from '../LandingPage';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('LandingPage (SPA - React Router)', () => {
  test('renders header and hero message', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LandingPage />
      </MemoryRouter>
    );

    // App name in header
    const header = screen.getByRole('banner') || screen.getByText(/English Study Hub/i);
    expect(header).toBeVisible();

    // Hero title should be present
    expect(
      screen.getByText(/Welcome to English Study Hub/i)
    ).toBeVisible();
  });

  test('clicking CTA navigates to /quiz using history router', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router location={history.location} navigator={history}>
        <LandingPage />
      </Router>
    );

    const user = userEvent.setup();

    // Find CTA by accessible name; fall back to first button if label differs
    const cta =
      screen.queryByRole('button', { name: /Start Quiz/i }) ||
      screen.queryByRole('link', { name: /Start Quiz/i }) ||
      screen.getByRole('button');

    await user.click(cta);

    // Expect navigation to /quiz
    expect(history.location.pathname).toBe('/quiz');
  });
});