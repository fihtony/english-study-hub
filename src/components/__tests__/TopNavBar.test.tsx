import { render, screen } from '@testing-library/react';
import TopNavBar from '../TopNavBar';

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />);
    const logo = screen.getByText('Linguist Library');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('DIV');
  });

  it('renders Sign In button', () => {
    render(<TopNavBar />);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.tagName).toBe('BUTTON');
  });

  it('renders all navigation links', () => {
    render(<TopNavBar />);
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' });
    const flashcardsLink = screen.getByRole('link', { name: 'Flashcards' });
    const progressLink = screen.getByRole('link', { name: 'Progress' });
    const libraryLink = screen.getByRole('link', { name: 'Library' });

    expect(lessonsLink).toBeInTheDocument();
    expect(flashcardsLink).toBeInTheDocument();
    expect(progressLink).toBeInTheDocument();
    expect(libraryLink).toBeInTheDocument();
  });

  it('navigation links have correct href attributes', () => {
    render(<TopNavBar />);
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' });
    expect(lessonsLink).toHaveAttribute('href', '#');
  });
});