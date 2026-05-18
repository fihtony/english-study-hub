import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '../pages/LandingPage.jsx';

describe('LandingPage', () => {
  it('renders the headline text', () => {
    render(<LandingPage />);
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy();
  });

  it('renders the CTA button', () => {
    render(<LandingPage />);
    expect(screen.getByText('Start Learning Now')).toBeTruthy();
  });

  it('renders all three category links', () => {
    render(<LandingPage />);
    expect(screen.getByText('Advanced Grammar')).toBeTruthy();
    expect(screen.getByText('Research Writing')).toBeTruthy();
    expect(screen.getByText('Formal Vocabulary')).toBeTruthy();
  });

  it('renders the logo text', () => {
    render(<LandingPage />);
    expect(screen.getByText('Linguist Library')).toBeTruthy();
  });

  it('renders the nav items', () => {
    render(<LandingPage />);
    expect(screen.getByText('Lessons')).toBeTruthy();
    expect(screen.getByText('Flashcards')).toBeTruthy();
    expect(screen.getByText('Progress')).toBeTruthy();
    expect(screen.getByText('Library')).toBeTruthy();
  });

  it('renders sign in button', () => {
    render(<LandingPage />);
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('renders the footer copyright', () => {
    render(<LandingPage />);
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeTruthy();
  });

  it('renders footer links', () => {
    render(<LandingPage />);
    expect(screen.getByText('Terms of Service')).toBeTruthy();
    expect(screen.getByText('Privacy Policy')).toBeTruthy();
    expect(screen.getByText('Contact Support')).toBeTruthy();
  });
});