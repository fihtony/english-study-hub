import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../LandingPage';

function Wrapper({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

test('renders landing page headline', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText(/Master Academic English with Scholarly Precision/i)).toBeTruthy();
});

test('renders Start Learning Now button', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Start Learning Now')).toBeTruthy();
});

test('renders category links', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Advanced Grammar')).toBeTruthy();
  expect(screen.getByText('Research Writing')).toBeTruthy();
  expect(screen.getByText('Formal Vocabulary')).toBeTruthy();
});

test('renders Sign In button', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Sign In')).toBeTruthy();
});

test('renders footer copyright', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText(/© 2024 Linguist Library/i)).toBeTruthy();
});

test('renders footer links', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Terms of Service')).toBeTruthy();
  expect(screen.getByText('Privacy Policy')).toBeTruthy();
  expect(screen.getByText('Contact Support')).toBeTruthy();
});

test('renders navigation links', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Lessons')).toBeTruthy();
  expect(screen.getByText('Flashcards')).toBeTruthy();
  expect(screen.getByText('Progress')).toBeTruthy();
  expect(screen.getByText('Library')).toBeTruthy();
});

test('renders logo text', () => {
  render(<LandingPage />, { wrapper: Wrapper });
  expect(screen.getByText('Linguist Library')).toBeTruthy();
});