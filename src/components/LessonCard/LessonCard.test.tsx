import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LessonCard } from './LessonCard';
import { Lesson } from '../../types/lesson';

const mockLesson: Lesson = {
  id: '1',
  title: 'Test Lesson',
  description: 'This is a test lesson description.',
  difficulty: 'Beginner',
  duration: '30 min',
};

describe('LessonCard', () => {
  it('renders lesson title', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Test Lesson')).toBeDefined();
  });

  it('renders lesson description', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('This is a test lesson description.')).toBeDefined();
  });

  it('renders difficulty badge', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('Beginner')).toBeDefined();
  });

  it('renders duration', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('30 min')).toBeDefined();
  });
});