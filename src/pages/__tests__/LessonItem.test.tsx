import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LessonItem } from '../LessonLibraryPage'
import type { Lesson } from '../../data/lessons'

const mockLesson: Lesson = {
  id: '1',
  unit: 'UNIT 01',
  title: 'Advanced Syntax in Academic Prose',
  description: 'Master the complexities of academic sentence structure.',
  difficulty: 'Advanced',
  duration: '45 min',
}

describe('LessonItem', () => {
  it('renders unit label', () => {
    const { getByText } = render(<LessonItem lesson={mockLesson} />)
    expect(getByText('UNIT 01')).toBeTruthy()
  })

  it('renders title', () => {
    const { getByText } = render(<LessonItem lesson={mockLesson} />)
    expect(getByText('Advanced Syntax in Academic Prose')).toBeTruthy()
  })

  it('renders description', () => {
    const { getByText } = render(<LessonItem lesson={mockLesson} />)
    expect(getByText('Master the complexities of academic sentence structure.')).toBeTruthy()
  })

  it('renders difficulty badge', () => {
    const { getByText } = render(<LessonItem lesson={mockLesson} />)
    expect(getByText('Advanced')).toBeTruthy()
  })

  it('renders duration', () => {
    const { getByText } = render(<LessonItem lesson={mockLesson} />)
    expect(getByText('45 min')).toBeTruthy()
  })
})