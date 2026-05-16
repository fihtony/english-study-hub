import { render, screen } from '@testing-library/react'
import { LessonCard } from '../LessonCard'
import type { Lesson } from '../../data/lessons'

describe('LessonCard', () => {
  const mockLesson: Lesson = {
    id: '1',
    title: 'Test Lesson',
    description: 'This is a test lesson description.',
    difficulty: 'Beginner',
    duration: '30 min',
    unit: 'UNIT 01'
  }

  it('renders lesson title', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('Test Lesson')).toBeInTheDocument()
  })

  it('renders lesson description', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('This is a test lesson description.')).toBeInTheDocument()
  })

  it('renders difficulty badge', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  it('renders duration', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('renders unit badge', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders Start button', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('displays correct difficulty color for Intermediate', () => {
    const intermediateLesson: Lesson = {
      ...mockLesson,
      difficulty: 'Intermediate'
    }
    render(<LessonCard lesson={intermediateLesson} />)
    const badge = screen.getByText('Intermediate')
    expect(badge).toHaveStyle({ backgroundColor: '#f59e0b' })
  })

  it('displays correct difficulty color for Advanced', () => {
    const advancedLesson: Lesson = {
      ...mockLesson,
      difficulty: 'Advanced'
    }
    render(<LessonCard lesson={advancedLesson} />)
    const badge = screen.getByText('Advanced')
    expect(badge).toHaveStyle({ backgroundColor: '#ef4444' })
  })
})