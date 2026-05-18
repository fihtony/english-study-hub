import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('renders all Stitch design text nodes verbatim', () => {
    render(<LandingPage />);

    // Logo
    expect(screen.getByText('Linguist Library')).toBeInTheDocument();

    // Nav links
    expect(screen.getByText('Lessons')).toBeInTheDocument();
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();

    // Sign In button
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

    // Hero headline
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument();

    // Primary CTA
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeInTheDocument();

    // Category links
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument();
    expect(screen.getByText('Research Writing')).toBeInTheDocument();
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument();

    // Footer
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });

  it('renders all required structural elements', () => {
    render(<LandingPage />);

    // Header/Nav
    expect(document.querySelector('.top-nav-bar')).toBeInTheDocument();
    expect(document.querySelector('.logo')).toBeInTheDocument();
    expect(document.querySelector('.nav-links')).toBeInTheDocument();
    expect(document.querySelector('.sign-in-btn')).toBeInTheDocument();

    // Main canvas
    expect(document.querySelector('.main-canvas')).toBeInTheDocument();
    expect(document.querySelector('.hero-headline')).toBeInTheDocument();
    expect(document.querySelector('.primary-cta')).toBeInTheDocument();
    expect(document.querySelector('.category-links')).toBeInTheDocument();

    // Footer
    expect(document.querySelector('.footer')).toBeInTheDocument();
    expect(document.querySelector('.copyright')).toBeInTheDocument();
    expect(document.querySelector('.footer-links')).toBeInTheDocument();
  });

  it('has correct category link structure', () => {
    render(<LandingPage />);

    const categoryLinks = document.querySelectorAll('.category-link');
    expect(categoryLinks).toHaveLength(3);

    const dividers = document.querySelectorAll('.divider');
    expect(dividers).toHaveLength(2);
  });

  it('has correct footer link structure', () => {
    render(<LandingPage />);

    const footerLinks = document.querySelectorAll('.footer-link');
    expect(footerLinks).toHaveLength(3);
  });
});