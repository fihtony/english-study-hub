import { describe, it, expect } from 'vitest'
import { lessons, filterLessons } from '../lessons'

describe('LessonLibraryPage', () => {
  describe('filterLessons', () => {
    it('returns all lessons when search term is empty', () => {
      const result = filterLessons(lessons, '')
      expect(result).toHaveLength(5)
    })

    it('returns all lessons when search term is whitespace only', () => {
      const result = filterLessons(lessons, '   ')
      expect(result).toHaveLength(5)
    })

    it('filters lessons by title (case insensitive)', () => {
      const result = filterLessons(lessons, 'syntax')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Advanced Syntax in Academic Prose')
    })

    it('filters lessons by partial title match', () => {
      const result = filterLessons(lessons, 'academic')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Advanced Syntax in Academic Prose')
    })

    it('filters lessons by unit', () => {
      const result = filterLessons(lessons, 'UNIT 01')
      expect(result).toHaveLength(2)
    })

    it('returns empty array when no lessons match', () => {
      const result = filterLessons(lessons, 'nonexistent')
      expect(result).toHaveLength(0)
    })
  })
})