import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LessonItem from '../LessonItem';
import type { Lesson } from '../../types/lesson';

describe('LessonItem', () => {
  const mockLesson: Lesson = {
    id: '1',
    title: 'Test Lesson Title',
    unit: 'UNIT 01',
  };

  it('renders lesson title', () => {
    render(<LessonItem lesson={mockLesson} />);
    expect(screen.getByText('Test Lesson Title')).toBeDefined();
  });

  it('renders unit label', () => {
    render(<LessonItem lesson={mockLesson} />);
    expect(screen.getByText('UNIT 01')).toBeDefined();
  });

  it('renders arrow icon', () => {
    const { container } = render(<LessonItem lesson={mockLesson} />);
    const icon = container.querySelector('.material-symbols-outlined');
    expect(icon?.textContent).toBe('arrow_forward');
  });

  it('has hover state classes', () => {
    const { container } = render(<LessonItem lesson={mockLesson} />);
    const anchor = container.querySelector('a');
    expect(anchor?.className).toContain('hover:bg-surface-container-low');
  });
});