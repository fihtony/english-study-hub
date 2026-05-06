import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Landing from '../Landing';
import { describe, it, expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Register jest-dom matchers with Vitest's expect
expect.extend(matchers);

describe('Landing', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders header, hero title, and footer', () => {
    render(<Landing />);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();

    const heroTitle = screen.getByTestId('hero-title');
    expect(heroTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent(/English Study Hub/i);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('has a primary h1 heading with the expected text', () => {
    render(<Landing />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/English Study Hub/i);
  });
});