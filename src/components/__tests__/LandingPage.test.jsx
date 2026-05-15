import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '../../pages/LandingPage';

describe('LandingPage', () => {
  it('should render the landing page', () => {
    render(<LandingPage />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('should render hero section with title', () => {
    render(<LandingPage />);
    const title = screen.getByText(/Premium Academic English/i);
    expect(title).toBeInTheDocument();
  });

  it('should render features section', () => {
    render(<LandingPage />);
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
    expect(screen.getByText(/Why Choose Linguist Library/i)).toBeInTheDocument();
  });

  it('should render CTA section', () => {
    render(<LandingPage />);
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
    expect(screen.getByText(/Ready to Start Learning/i)).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(<LandingPage />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should have correct Stitch node ID annotations', () => {
    const { container } = render(<LandingPage />);
    const annotatedElements = container.querySelectorAll('[data-stitch-id]');
    expect(annotatedElements.length).toBeGreaterThan(0);
  });

  it('should render all feature cards', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Curated Texts/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/Progress Tracking/i)).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(<LandingPage />);
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Learn More/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Your Free Trial/i })).toBeInTheDocument();
  });
});
