import { describe, it, expect } from 'vitest'
import { filterLessons, lessons } from '../lessons'

describe('filterLessons', () => {
  it('returns all lessons when no filter applied', () => {
    const result = filterLessons(lessons, '', 'All')
    expect(result.length).toBe(lessons.length)
  })

  it('filters by search term', () => {
    const result = filterLessons(lessons, 'syntax', 'All')
    expect(result.length).toBe(1)
    expect(result[0].title).toContain('Syntax')
  })

  it('filters by difficulty', () => {
    const result = filterLessons(lessons, '', 'Beginner')
    expect(result.length).toBe(2)
    result.forEach(lesson => {
      expect(lesson.difficulty).toBe('Beginner')
    })
  })

  it('combines search and difficulty filters', () => {
    const result = filterLessons(lessons, 'methodology', 'Advanced')
    expect(result.length).toBe(1)
    expect(result[0].difficulty).toBe('Advanced')
    expect(result[0].title.toLowerCase()).toContain('methodology')
  })

  it('returns empty when no matches', () => {
    const result = filterLessons(lessons, 'xyz123', 'All')
    expect(result.length).toBe(0)
  })

  it('is case insensitive for search', () => {
    const result = filterLessons(lessons, 'SYntax', 'All')
    expect(result.length).toBe(1)
  })
})