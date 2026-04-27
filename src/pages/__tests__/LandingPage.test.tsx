import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  test('renders header, hero message, and navigates to /quiz on CTA click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<div>Quiz Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Header: accept either a semantic heading or plain text
    const heading =
      screen.queryByRole('heading', { name: /English Study Hub/i }) ||
      screen.queryByText('English Study Hub');
    expect(heading).toBeInTheDocument();

    // Hero message
    expect(screen.getByText('Welcome to English Study Hub')).toBeInTheDocument();

    // CTA button
    const cta = screen.getByRole('button', { name: /Start Quiz/i }) || screen.getByText('Start Quiz');
    expect(cta).toBeInTheDocument();

    // Click CTA and assert navigation happened by checking the /quiz route content
    fireEvent.click(cta);
    expect(screen.getByText('Quiz Page')).toBeInTheDocument();
  });
});