import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('renders all main sections', () => {
    render(<LandingPage />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders header with logo and navigation', () => {
    render(<LandingPage />);
    expect(screen.getByText('Linguist Library')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders hero section with CTA', () => {
    render(<LandingPage />);
    expect(screen.getByRole('heading', { name: /Master Academic English with Scholarly Precision/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeInTheDocument();
  });

  it('renders footer with links', () => {
    render(<LandingPage />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Linguist Library\\. Premium Academic English Study\\.`, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Support' })).toBeInTheDocument();
  });
});
