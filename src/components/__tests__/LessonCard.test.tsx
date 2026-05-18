import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LessonCard from '../../components/LessonCard';

const mockLesson = {
  id: '1',
  title: 'Test Lesson',
  description: 'Test Description',
  unit: 'UNIT 01',
  difficulty: 'beginner' as const,
  duration: '30 min'
};

describe('LessonCard', () => {
  it('renders lesson title', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Lesson')).toBeInTheDocument();
  });

  it('renders lesson unit', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );
    expect(screen.getByText('UNIT 01')).toBeInTheDocument();
  });

  it('renders arrow icon', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    );
    const arrowIcon = screen.getByText('arrow_forward');
    expect(arrowIcon).toBeInTheDocument();
  });
});