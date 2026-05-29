import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PracticeQuizPage from './PracticeQuizPage';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App routing', () => {
  it('redirects from root to /quiz', () => {
    render(<App />);
    expect(window.location.pathname).toBe('/quiz');
  });
});

describe('PracticeQuizPage', () => {
  it('renders the quiz page with question and options', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('QUESTION 4 OF 12')).toBeInTheDocument();
    expect(screen.getByText('Which of the following sentences correctly utilizes the present perfect continuous tense?')).toBeInTheDocument();
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

  it('allows selecting a radio option', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeChecked();

    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
  });

  it('displays the Next button', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  it('displays progress indicator', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('33% COMPLETE')).toBeInTheDocument();
  });
});

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Linguist Library')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Lessons')).toBeInTheDocument();
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders copyright text', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument();
  });

  it('renders policy links', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });
});

describe('ArrowForwardIcon', () => {
  it('renders icon in Next button', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton.querySelector('svg')).toBeInTheDocument();
  });
});