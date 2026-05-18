import { describe, it, expect } from 'vitest';
import { LessonCard, filterLessons } from '../../components/LessonCard';
import { render } from '@testing-library/react';
import type { Lesson } from '../../data/lessons';

const mockLesson: Lesson = {
  id: '1',
  title: 'Test Lesson',
  description: 'Test description for filtering',
  difficulty: 'Beginner',
  duration: '30 min',
};

describe('LessonCard', () => {
  it('renders lesson title', () => {
    const { getByText } = render(<LessonCard lesson={mockLesson} />);
    expect(getByText('Test Lesson')).toBeTruthy();
  });

  it('renders lesson description', () => {
    const { getByText } = render(<LessonCard lesson={mockLesson} />);
    expect(getByText('Test description for filtering')).toBeTruthy();
  });

  it('renders difficulty badge', () => {
    const { getByText } = render(<LessonCard lesson={mockLesson} />);
    expect(getByText('Beginner')).toBeTruthy();
  });

  it('renders duration', () => {
    const { getByText } = render(<LessonCard lesson={mockLesson} />);
    expect(getByText('30 min')).toBeTruthy();
  });
});

describe('filterLessons', () => {
  const lessons: Lesson[] = [
    { id: '1', title: 'React Basics', description: 'Learn React', difficulty: 'Beginner', duration: '30 min' },
    { id: '2', title: 'Advanced TypeScript', description: 'Deep dive', difficulty: 'Advanced', duration: '45 min' },
    { id: '3', title: 'State Management', description: 'Redux and Context', difficulty: 'Intermediate', duration: '40 min' },
  ];

  it('returns all lessons when no filters applied', () => {
    const result = filterLessons(lessons, '', '');
    expect(result).toHaveLength(3);
  });

  it('filters by search query in title', () => {
    const result = filterLessons(lessons, 'react', '');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('React Basics');
  });

  it('filters by search query in description', () => {
    const result = filterLessons(lessons, 'redux', '');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('State Management');
  });

  it('filters by difficulty level', () => {
    const result = filterLessons(lessons, '', 'Advanced');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Advanced TypeScript');
  });

  it('combines search and difficulty filters', () => {
    const result = filterLessons(lessons, 'deep', 'Advanced');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Advanced TypeScript');
  });

  it('returns empty array when no matches', () => {
    const result = filterLessons(lessons, 'nonexistent', '');
    expect(result).toHaveLength(0);
  });
});