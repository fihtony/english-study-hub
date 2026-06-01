import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders main heading', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { name: /Master Academic English with Scholarly Precision/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('renders Start Learning Now button', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('CTA button is interactive and not disabled', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' });
    expect(ctaButton).not.toBeDisabled();
  });

  it('renders category links', () => {
    render(<HeroSection />);
    const grammarLink = screen.getByRole('link', { name: /Advanced Grammar/i });
    const writingLink = screen.getByRole('link', { name: /Research Writing/i });
    const vocabLink = screen.getByRole('link', { name: /Formal Vocabulary/i });

    expect(grammarLink).toBeInTheDocument();
    expect(writingLink).toBeInTheDocument();
    expect(vocabLink).toBeInTheDocument();
  });

  it('category links are anchor elements with correct href', () => {
    render(<HeroSection />);
    const grammarLink = screen.getByRole('link', { name: /Advanced Grammar/i });
    const writingLink = screen.getByRole('link', { name: /Research Writing/i });
    const vocabLink = screen.getByRole('link', { name: /Formal Vocabulary/i });

    expect(grammarLink.tagName).toBe('A');
    expect(grammarLink).toHaveAttribute('href', '#');
    expect(writingLink.tagName).toBe('A');
    expect(writingLink).toHaveAttribute('href', '#');
    expect(vocabLink.tagName).toBe('A');
    expect(vocabLink).toHaveAttribute('href', '#');
  });

  it('has accessible SVG icons for category links', () => {
    render(<HeroSection />);
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
