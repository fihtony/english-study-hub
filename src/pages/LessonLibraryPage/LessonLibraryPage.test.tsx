import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LessonLibraryPage } from './LessonLibraryPage';

describe('LessonLibraryPage', () => {
  it('renders all lessons by default', () => {
    render(<LessonLibraryPage />);
    expect(screen.getByText('English Study Hub')).toBeDefined();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('filters lessons by search query', () => {
    render(<LessonLibraryPage />);
    const input = screen.getByPlaceholderText('Search lessons...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Basic' } });
    expect(screen.getByText('Basic Greetings')).toBeDefined();
  });

  it('filters lessons by difficulty', () => {
    render(<LessonLibraryPage />);
    const buttons = screen.getAllByRole('button');
    const beginnerButton = buttons.find(b => b.textContent === 'Beginner' && b.className.includes('bg-white'));
    expect(beginnerButton).toBeDefined();
    if (beginnerButton) fireEvent.click(beginnerButton);
    expect(screen.getByText('Basic Greetings')).toBeDefined();
  });
});