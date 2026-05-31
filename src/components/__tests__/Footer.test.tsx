import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(new RegExp(`© ${currentYear} Linguist Library`, 'i'));
    expect(copyright).toBeInTheDocument();
  });

  it('renders Terms of Service link', () => {
    render(<Footer />);
    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.tagName).toBe('A');
    expect(termsLink).toHaveAttribute('href', '#');
  });

  it('renders Privacy Policy link', () => {
    render(<Footer />);
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.tagName).toBe('A');
  });

  it('renders Contact Support link', () => {
    render(<Footer />);
    const contactLink = screen.getByRole('link', { name: 'Contact Support' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.tagName).toBe('A');
  });

  it('all footer links have href attributes', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
});