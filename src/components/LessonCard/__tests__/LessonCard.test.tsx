import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LessonCard } from '../LessonCard';

describe('LessonCard', () => {
  it('renders title, description, difficulty, and duration', () => {
    render(
      <LessonCard
        title="Test Lesson"
        description="Test description"
        difficulty="Easy"
        duration="15 min"
      />
    );

    expect(screen.getByText('Test Lesson')).toBeDefined();
    expect(screen.getByText('Test description')).toBeDefined();
    expect(screen.getByText('Easy')).toBeDefined();
    expect(screen.getByText('15 min')).toBeDefined();
  });

  it('renders correct difficulty class for each level', () => {
    const { rerender } = render(
      <LessonCard
        title="Easy Lesson"
        description="Description"
        difficulty="Easy"
        duration="10 min"
      />
    );
    expect(document.querySelector('.difficulty-easy')).toBeDefined();

    rerender(
      <LessonCard
        title="Medium Lesson"
        description="Description"
        difficulty="Medium"
        duration="20 min"
      />
    );
    expect(document.querySelector('.difficulty-medium')).toBeDefined();

    rerender(
      <LessonCard
        title="Hard Lesson"
        description="Description"
        difficulty="Hard"
        duration="30 min"
      />
    );
    expect(document.querySelector('.difficulty-hard')).toBeDefined();
  });

  it('has lesson-card class for styling', () => {
    render(
      <LessonCard
        title="Styled Lesson"
        description="Description"
        difficulty="Medium"
        duration="25 min"
      />
    );
    expect(document.querySelector('.lesson-card')).toBeDefined();
  });
});