import { describe, it, expect } from 'vitest'
import { filterLessons, type Lesson } from '../../data/lessons'

const mockLessons: Lesson[] = [
  {
    id: '1',
    unit: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master the complexities of academic sentence structure.',
    difficulty: 'Advanced',
    duration: '45 min',
  },
  {
    id: '2',
    unit: 'UNIT 01',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore the roots of English vocabulary.',
    difficulty: 'Intermediate',
    duration: '30 min',
  },
  {
    id: '3',
    unit: 'UNIT 02',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Craft compelling academic arguments.',
    difficulty: 'Advanced',
    duration: '60 min',
  },
  {
    id: '4',
    unit: 'UNIT 02',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Analyze literature across different cultures.',
    difficulty: 'Intermediate',
    duration: '50 min',
  },
  {
    id: '5',
    unit: 'UNIT 03',
    title: 'Scientific Methodology and Report Composition',
    description: 'Write clear scientific reports.',
    difficulty: 'Beginner',
    duration: '40 min',
  },
]

describe('filterLessons', () => {
  it('returns all lessons when no filters applied', () => {
    const result = filterLessons(mockLessons, '', '')
    expect(result).toHaveLength(5)
  })

  it('filters by search term (title match)', () => {
    const result = filterLessons(mockLessons, 'syntax', '')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Advanced Syntax in Academic Prose')
  })

  it('filters by search term (description match)', () => {
    const result = filterLessons(mockLessons, 'vocabulary', '')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Etymology and the Evolution of Modern Lexicon')
  })

  it('filters by difficulty level', () => {
    const result = filterLessons(mockLessons, '', 'Advanced')
    expect(result).toHaveLength(2)
    expect(result.every(l => l.difficulty === 'Advanced')).toBe(true)
  })

  it('filters by difficulty - Beginner', () => {
    const result = filterLessons(mockLessons, '', 'Beginner')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Scientific Methodology and Report Composition')
  })

  it('combines search and difficulty filters', () => {
    const result = filterLessons(mockLessons, 'syntax', 'Advanced')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Advanced Syntax in Academic Prose')
  })

  it('returns empty array when no matches', () => {
    const result = filterLessons(mockLessons, 'xyz123', '')
    expect(result).toHaveLength(0)
  })

  it('case insensitive search', () => {
    const result = filterLessons(mockLessons, 'SYntax', '')
    expect(result).toHaveLength(1)
  })
})