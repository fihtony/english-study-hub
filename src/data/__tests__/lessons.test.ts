import { describe, it, expect } from 'vitest';
import { lessons } from '../lessons';
import type { Lesson } from '../../types/lesson';

describe('lessons data', () => {
  it('contains expected number of lessons', () => {
    expect(lessons.length).toBe(5);
  });

  it('all lessons have required fields', () => {
    lessons.forEach((lesson: Lesson) => {
      expect(lesson.id).toBeDefined();
      expect(lesson.title).toBeDefined();
      expect(lesson.unit).toBeDefined();
    });
  });

  it('lessons have valid unit format', () => {
    lessons.forEach((lesson: Lesson) => {
      expect(lesson.unit).toMatch(/^UNIT \d{2}$/);
    });
  });
});