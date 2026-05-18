import { describe, it, expect } from 'vitest'
import { filterLessons } from '../LessonLibraryPage'
import { Lesson } from '../../data/lessons'

const mockLessons: Lesson[] = [
  { id: '1', title: 'Advanced Syntax', description: 'Complex sentences', unit: '01', difficulty: 'Advanced', duration: '45 min' },
  { id: '2', title: 'Basic Grammar', description: 'Simple sentences', unit: '01', difficulty: 'Beginner', duration: '30 min' },
  { id: '3', title: 'Intermediate Writing', description: 'Paragraph structure', unit: '02', difficulty: 'Intermediate', duration: '40 min' }
]

describe('filterLessons', () => {
  it('returns all lessons when no filters applied', () => {
    const result = filterLessons(mockLessons, { search: '', difficulty: '' })
    expect(result).toHaveLength(3)
  })

  it('filters by search term in title', () => {
    const result = filterLessons(mockLessons, { search: 'syntax', difficulty: '' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Advanced Syntax')
  })

  it('filters by search term in description', () => {
    const result = filterLessons(mockLessons, { search: 'paragraph', difficulty: '' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Intermediate Writing')
  })

  it('filters by difficulty', () => {
    const result = filterLessons(mockLessons, { search: '', difficulty: 'Beginner' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Basic Grammar')
  })

  it('combines search and difficulty filters', () => {
    const result = filterLessons(mockLessons, { search: 'grammar', difficulty: 'Beginner' })
    expect(result).toHaveLength(1)
  })

  it('returns empty when no matches', () => {
    const result = filterLessons(mockLessons, { search: 'xyz', difficulty: '' })
    expect(result).toHaveLength(0)
  })
})