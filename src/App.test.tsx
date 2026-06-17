import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the application root', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });
});
