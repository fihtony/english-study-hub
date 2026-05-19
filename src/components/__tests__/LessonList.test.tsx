import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import LessonList from '../LessonList'

const mockLessons = [
  {
    id: '1',
    unit: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
    difficulty: 'Advanced',
    duration: '45 min',
    description: 'Master complex sentence structures.',
  },
  {
    id: '2',
    unit: 'UNIT 01',
    title: 'Etymology and the Evolution of Modern Lexicon',
    difficulty: 'Intermediate',
    duration: '30 min',
    description: 'Explore historical roots of English vocabulary.',
  },
]

describe('LessonList', () => {
  it('renders lesson titles correctly', () => {
    const { container } = render(<LessonList lessons={mockLessons} />)
    const h2Elements = container.querySelectorAll('h2')
    expect(h2Elements.length).toBeGreaterThanOrEqual(2)
  })

  it('displays unit labels', () => {
    const { container } = render(<LessonList lessons={mockLessons} />)
    const spans = container.querySelectorAll('span')
    const unitLabels = Array.from(spans).filter(s => s.textContent === 'UNIT 01')
    expect(unitLabels.length).toBeGreaterThanOrEqual(2)
  })
})