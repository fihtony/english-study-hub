import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

const mockLesson = {
  id: '1',
  title: 'Test Lesson',
  description: 'Test description',
  unit: '01',
  difficulty: 'Intermediate' as const,
  duration: '30 min'
}

describe('LessonCard', () => {
  it('renders lesson title', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('Test Lesson')).toBeDefined()
  })

  it('renders unit label', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('UNIT 01')).toBeDefined()
  })

  it('renders arrow icon', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('arrow_forward')).toBeDefined()
  })
})