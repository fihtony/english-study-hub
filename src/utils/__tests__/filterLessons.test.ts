import { describe, it, expect } from 'vitest';
import { filterLessons } from '../filterLessons';

describe('filterLessons', () => {
  it('returns all lessons when no filters applied', () => {
    const result = filterLessons('', 'All');
    expect(result.length).toBe(6);
  });

  it('filters by search query matching title', () => {
    const result = filterLessons('pronunciation', 'All');
    expect(result.length).toBe(1);
    expect(result[0].title).toContain('Pronunciation');
  });

  it('filters by search query matching description', () => {
    const result = filterLessons('grammar', 'All');
    expect(result.length).toBe(1);
    expect(result[0].title).toContain('Grammar');
  });

  it('filters by difficulty level', () => {
    const result = filterLessons('', 'Easy');
    expect(result.length).toBe(2);
    result.forEach((lesson) => {
      expect(lesson.difficulty).toBe('Easy');
    });
  });

  it('combines search and difficulty filters', () => {
    const result = filterLessons('english', 'Medium');
    expect(result.length).toBe(2);
    result.forEach((lesson) => {
      expect(lesson.difficulty).toBe('Medium');
    });
  });

  it('returns empty array when no matches', () => {
    const result = filterLessons('nonexistent', 'All');
    expect(result.length).toBe(0);
  });
});