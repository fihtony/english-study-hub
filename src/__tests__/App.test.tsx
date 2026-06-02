import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the landing page with header, main content, and footer', () => {
    render(<App />);

    // Header
    expect(screen.getByText('Linguist Library')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();

    // Navigation links
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Flashcards' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Progress' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument();

    // Main content
    expect(screen.getByRole('heading', { name: /Master Academic English with Scholarly Precision/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeInTheDocument();

    // Category links
    expect(screen.getByRole('link', { name: /Advanced Grammar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Research Writing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Formal Vocabulary/i })).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/©.*Linguist Library/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Support' })).toBeInTheDocument();
  });

  it('displays the current year in the copyright', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    expect(screen.getAllByText(new RegExp(`${currentYear}`))[0]).toBeInTheDocument();
  });

  it('has nav links with correct href attributes', () => {
    render(<App />);
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' });
    expect(lessonsLink).toHaveAttribute('href', '#');
  });

  it('has category links as anchor elements', () => {
    render(<App />);
    const grammarLink = screen.getByRole('link', { name: /Advanced Grammar/i });
    expect(grammarLink.tagName).toBe('A');
  });

  it('CTA button is a button element', () => {
    render(<App />);
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' });
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('Sign In button is a button element', () => {
    render(<App />);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton.tagName).toBe('BUTTON');
  });
});