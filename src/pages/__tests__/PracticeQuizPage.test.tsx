import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PracticeQuizPage, { QuizQuestion, QuizProgress } from '../PracticeQuizPage';

describe('PracticeQuizPage', () => {
  describe('Rendering', () => {
    it('renders the quiz page with all components', () => {
      render(<PracticeQuizPage />);

      expect(screen.getByText('Linguist Library')).toBeDefined();
      expect(screen.getByText('Sign In')).toBeDefined();
    });

    it('renders question text and quote', () => {
      const quizData: QuizQuestion = {
        id: 1,
        question: 'Test question?',
        quote: 'Test quote text.',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: 0
      };
      render(<PracticeQuizPage quizData={quizData} />);

      expect(screen.getByText('Test question?')).toBeDefined();
      expect(screen.getByText('"Test quote text."')).toBeDefined();
    });

    it('renders all quiz options', () => {
      const quizData: QuizQuestion = {
        id: 1,
        question: 'Test question?',
        quote: 'Test quote.',
        options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
        correctIndex: 1
      };
      render(<PracticeQuizPage quizData={quizData} />);

      expect(screen.getByText('Alpha')).toBeDefined();
      expect(screen.getByText('Beta')).toBeDefined();
      expect(screen.getByText('Gamma')).toBeDefined();
      expect(screen.getByText('Delta')).toBeDefined();
    });

    it('renders progress indicator with correct values', () => {
      const progress: QuizProgress = {
        currentQuestion: 5,
        totalQuestions: 10
      };
      render(<PracticeQuizPage progress={progress} />);

      expect(screen.getByText('QUESTION 5 OF 10')).toBeDefined();
      expect(screen.getByText('50% COMPLETE')).toBeDefined();
    });

    it('renders Next button', () => {
      render(<PracticeQuizPage />);
      expect(screen.getByRole('button', { name: /next/i })).toBeDefined();
    });
  });

  describe('Navigation', () => {
    it('calls onNext when Next button is clicked', () => {
      const handleNext = vi.fn();
      render(<PracticeQuizPage onNext={handleNext} />);

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      expect(handleNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('renders fieldset and legend for radio group', () => {
      render(<PracticeQuizPage />);

      const fieldset = document.querySelector('fieldset');
      expect(fieldset).toBeDefined();

      const legend = document.querySelector('legend');
      expect(legend).toBeDefined();
    });

    it('label elements have htmlFor attributes linking to radio inputs', () => {
      const quizData: QuizQuestion = {
        id: 1,
        question: 'Test?',
        quote: 'Quote.',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0
      };
      render(<PracticeQuizPage quizData={quizData} />);

      const labels = document.querySelectorAll('label');
      labels.forEach((label) => {
        const htmlFor = label.getAttribute('for');
        expect(htmlFor).toBeTruthy();
        expect(htmlFor).toMatch(/^quiz-option-\d+$/);
      });
    });

    it('nav links have role="link" and aria-disabled="true" for placeholder links', () => {
      render(<PracticeQuizPage />);

      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach((link) => {
        expect(link.getAttribute('role')).toBe('link');
        expect(link.getAttribute('aria-disabled')).toBe('true');
      });
    });

    it('footer links have role="link" and aria-disabled="true" for placeholder links', () => {
      render(<PracticeQuizPage />);

      const footerLinks = document.querySelectorAll('footer a');
      footerLinks.forEach((link) => {
        expect(link.getAttribute('role')).toBe('link');
        expect(link.getAttribute('aria-disabled')).toBe('true');
      });
    });
  });

  describe('Quiz answer correctness', () => {
    it('accepts correct answer index and marks correct radio as defaultChecked', () => {
      const quizData: QuizQuestion = {
        id: 1,
        question: 'Which is correct?',
        quote: 'The correct answer is B.',
        options: ['Wrong', 'Correct', 'Wrong', 'Wrong'],
        correctIndex: 1
      };
      render(<PracticeQuizPage quizData={quizData} />);

      const correctRadio = document.querySelector('#quiz-option-1') as HTMLInputElement;
      expect(correctRadio.checked).toBe(true);
    });

    it('marks only the correct answer radio as checked', () => {
      const quizData: QuizQuestion = {
        id: 1,
        question: 'Which is correct?',
        quote: 'Answer is C.',
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 2
      };
      render(<PracticeQuizPage quizData={quizData} />);

      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((radio, index) => {
        const input = radio as HTMLInputElement;
        if (index === 2) {
          expect(input.checked).toBe(true);
        } else {
          expect(input.checked).toBe(false);
        }
      });
    });
  });

  describe('Prop-driven quiz data', () => {
    it('accepts quiz data through props', () => {
      const customQuizData: QuizQuestion = {
        id: 99,
        question: 'Custom question from props?',
        quote: 'Custom quote content.',
        options: ['Prop A', 'Prop B', 'Prop C', 'Prop D'],
        correctIndex: 3
      };

      const customProgress: QuizProgress = {
        currentQuestion: 7,
        totalQuestions: 20
      };

      render(<PracticeQuizPage quizData={customQuizData} progress={customProgress} />);

      expect(screen.getByText('Custom question from props?')).toBeDefined();
      expect(screen.getByText('"Custom quote content."')).toBeDefined();
      expect(screen.getByText('Prop D')).toBeDefined();
      expect(screen.getByText('QUESTION 7 OF 20')).toBeDefined();
      expect(screen.getByText('35% COMPLETE')).toBeDefined();
    });

    it('uses default values when props not provided', () => {
      render(<PracticeQuizPage />);

      expect(screen.getByText('QUESTION 4 OF 12')).toBeDefined();
      expect(screen.getByText('33% COMPLETE')).toBeDefined();
    });
  });

  describe('Progress calculation', () => {
    it('calculates progress percentage correctly', () => {
      const progress: QuizProgress = {
        currentQuestion: 1,
        totalQuestions: 4
      };
      render(<PracticeQuizPage progress={progress} />);

      expect(screen.getByText('25% COMPLETE')).toBeDefined();
    });

    it('handles 100% completion', () => {
      const progress: QuizProgress = {
        currentQuestion: 10,
        totalQuestions: 10
      };
      render(<PracticeQuizPage progress={progress} />);

      expect(screen.getByText('100% COMPLETE')).toBeDefined();
    });

    it('handles 0% completion', () => {
      const progress: QuizProgress = {
        currentQuestion: 0,
        totalQuestions: 10
      };
      render(<PracticeQuizPage progress={progress} />);

      expect(screen.getByText('0% COMPLETE')).toBeDefined();
    });
  });

  describe('Footer', () => {
    it('displays dynamic copyright year', () => {
      render(<PracticeQuizPage />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeDefined();
    });

    it('displays footer policy links', () => {
      render(<PracticeQuizPage />);

      expect(screen.getByText('Terms of Service')).toBeDefined();
      expect(screen.getByText('Privacy Policy')).toBeDefined();
      expect(screen.getByText('Contact Support')).toBeDefined();
    });
  });
});