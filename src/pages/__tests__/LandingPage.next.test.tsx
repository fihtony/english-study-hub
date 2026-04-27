import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/router before importing the page so the page gets the mocked router
const pushMock = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: jest.fn(),
    pathname: '/',
  }),
}));

import LandingPage from '../index';

describe('LandingPage (Next.js)', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders header and hero content', () => {
    render(<LandingPage />);

    // Header (app name)
    const header = screen.queryByRole('heading', { name: /english study hub/i }) || screen.queryByText(/english study hub/i);
    expect(header).toBeInTheDocument();

    // Hero welcome message
    const welcome = screen.queryByText(/welcome to english study hub/i) || screen.queryByText(/welcome to/i);
    expect(welcome).toBeInTheDocument();
  });

  it("navigates to '/quiz' when CTA is activated", () => {
    render(<LandingPage />);

    // Find CTA by accessible name or visible text
    const cta = (screen.queryByRole('button', { name: /start quiz/i }) ||
                 screen.queryByRole('link', { name: /start quiz/i }) ||
                 screen.queryByText(/start quiz/i)) as HTMLElement | null;

    expect(cta).toBeTruthy();

    // Click the CTA
    fireEvent.click(cta!);

    // If the CTA is a link element, assert it points to /quiz; otherwise assert router.push was called
    const tag = cta!.tagName.toLowerCase();
    if (tag === 'a') {
      // anchor href may be absolute depending on environment; check endsWith
      const href = (cta as HTMLAnchorElement).getAttribute('href') || '';
      expect(href.endsWith('/quiz')).toBe(true);
    } else {
      expect(pushMock).toHaveBeenCalledWith('/quiz');
    }
  });
});