import { describe, it, expect } from 'vitest'
import { filterLessons } from '../lessons'

describe('filterLessons', () => {
  describe('search functionality', () => {
    it('returns all lessons when search is empty', () => {
      const result = filterLessons('', 'All', 'all')
      expect(result).toHaveLength(5)
    })

    it('filters lessons by title', () => {
      const result = filterLessons('greetings', 'All', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Basic Greetings')
    })

    it('filters lessons by description', () => {
      const result = filterLessons('restaurant', 'All', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('At the Restaurant')
    })

    it('is case insensitive', () => {
      const result = filterLessons('BUSINESS', 'All', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Business English')
    })
  })

  describe('difficulty filter', () => {
    it('returns all lessons when difficulty is All', () => {
      const result = filterLessons('', 'All', 'all')
      expect(result).toHaveLength(5)
    })

    it('filters Beginner lessons only', () => {
      const result = filterLessons('', 'Beginner', 'all')
      expect(result).toHaveLength(2)
      result.forEach(lesson => {
        expect(lesson.difficulty).toBe('Beginner')
      })
    })

    it('filters Intermediate lessons only', () => {
      const result = filterLessons('', 'Intermediate', 'all')
      expect(result).toHaveLength(2)
      result.forEach(lesson => {
        expect(lesson.difficulty).toBe('Intermediate')
      })
    })

    it('filters Advanced lessons only', () => {
      const result = filterLessons('', 'Advanced', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].difficulty).toBe('Advanced')
    })
  })

  describe('duration filter', () => {
    it('returns all lessons when duration is all', () => {
      const result = filterLessons('', 'All', 'all')
      expect(result).toHaveLength(5)
    })

    it('filters short duration lessons (under 30 min)', () => {
      const result = filterLessons('', 'All', 'short')
      expect(result.length).toBeGreaterThan(0)
      result.forEach(lesson => {
        const minutes = parseInt(lesson.duration)
        expect(minutes).toBeLessThanOrEqual(30)
      })
    })

    it('filters medium duration lessons (30-50 min)', () => {
      const result = filterLessons('', 'All', 'medium')
      result.forEach(lesson => {
        const minutes = parseInt(lesson.duration)
        expect(minutes).toBeGreaterThanOrEqual(30)
        expect(minutes).toBeLessThanOrEqual(50)
      })
    })

    it('filters long duration lessons (over 50 min)', () => {
      const result = filterLessons('', 'All', 'long')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Business English')
    })
  })

  describe('combined filters', () => {
    it('filters by search and difficulty', () => {
      const result = filterLessons('english', 'Advanced', 'all')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Business English')
    })

    it('filters by search and duration', () => {
      const result = filterLessons('restaurant', 'All', 'medium')
      expect(result).toHaveLength(1)
    })

    it('filters by all three criteria', () => {
      // "basic" matches "Basic Greetings" (30 min, Beginner)
      // "Numbers and Counting" is 25 min so also matches short duration filter
      const result = filterLessons('greetings', 'Beginner', 'short')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Basic Greetings')
    })

    it('returns empty when no lessons match', () => {
      const result = filterLessons('xyz123', 'Advanced', 'short')
      expect(result).toHaveLength(0)
    })
  })
})