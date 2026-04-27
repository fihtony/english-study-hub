import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LandingPage from '../LandingPage';

afterEach(() => {
  cleanup();
});

describe('LandingPage', () => {
  test('renders header and hero message', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LandingPage />
      </MemoryRouter>
    );

    // Header should display the app name
    expect(screen.getByText(/English Study Hub/i)).toBeVisible();

    // Hero title should be present
    expect(
      screen.getByText(/Welcome to English Study Hub/i)
    ).toBeVisible();
  });

  test('clicking CTA navigates to /quiz', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <Router location={history.location} navigator={history}>
        <LandingPage />
      </Router>
    );

    const user = userEvent.setup();

    // Find CTA button by role and accessible name. Accept common label "Start Quiz".
    const cta =
      screen.queryByRole('button', { name: /Start Quiz/i }) ||
      screen.getByRole('button');

    await user.click(cta);

    // After clicking, expect navigation to /quiz
    expect(history.location.pathname).toBe('/quiz');
  });
});