import { describe, it, expect } from 'vitest'

const filterLessons = (lessons: any[], searchTerm: string, difficultyFilter: string) => {
  return lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === '' || lesson.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })
}

const mockLessons = [
  { id: '1', title: 'Advanced Syntax', difficulty: 'Advanced', description: 'Complex sentences' },
  { id: '2', title: 'Basic Grammar', difficulty: 'Beginner', description: 'Simple concepts' },
  { id: '3', title: 'Intermediate Writing', difficulty: 'Intermediate', description: 'Writing skills' },
]

describe('Filter Logic', () => {
  it('filters lessons by search term', () => {
    const result = filterLessons(mockLessons, 'syntax', '')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Advanced Syntax')
  })

  it('filters lessons by difficulty', () => {
    const result = filterLessons(mockLessons, '', 'Advanced')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Advanced Syntax')
  })

  it('combines search and difficulty filters', () => {
    const result = filterLessons(mockLessons, 'grammar', 'Beginner')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Basic Grammar')
  })

  it('returns all lessons when no filter applied', () => {
    const result = filterLessons(mockLessons, '', '')
    expect(result).toHaveLength(3)
  })
})