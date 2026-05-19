import { describe, it, expect } from 'vitest';
import { lessons } from '../data/lessons';
import { Lesson } from '../types/lesson';

export function filterLessons(lessonList: Lesson[], query: string): Lesson[] {
  if (!query.trim()) return lessonList;
  const lowerQuery = query.toLowerCase();
  return lessonList.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.unit.toLowerCase().includes(lowerQuery)
  );
}

describe('filterLessons', () => {
  it('returns all lessons when query is empty', () => {
    const result = filterLessons(lessons, '');
    expect(result.length).toBe(5);
  });

  it('returns all lessons when query is whitespace', () => {
    const result = filterLessons(lessons, '   ');
    expect(result.length).toBe(5);
  });

  it('filters by title', () => {
    const result = filterLessons(lessons, 'Advanced');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Advanced Syntax in Academic Prose');
  });

  it('filters by unit', () => {
    const result = filterLessons(lessons, 'UNIT 01');
    expect(result.length).toBe(2);
  });

  it('case insensitive search', () => {
    const result = filterLessons(lessons, 'advanced');
    expect(result.length).toBe(1);
  });

  it('returns empty when no match', () => {
    const result = filterLessons(lessons, 'xyz123');
    expect(result.length).toBe(0);
  });
});