import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PracticeQuizPage from './PracticeQuizPage';
import { BrowserRouter } from 'react-router-dom';

describe('PracticeQuizPage', () => {
  it('renders the quiz page with question and options', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/QUESTION 4 OF 12/)).toBeInTheDocument();
    expect(screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous tense/)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('renders all quiz options', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('have been gathering')).toBeInTheDocument();
    expect(screen.getByText('had gathered')).toBeInTheDocument();
    expect(screen.getByText('are gathering')).toBeInTheDocument();
    expect(screen.getByText('will have gathered')).toBeInTheDocument();
  });
});