import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'
import { Lesson } from '../../types/Lesson'

const mockLesson: Lesson = {
  id: '1',
  title: 'Advanced Syntax in Academic Prose',
  description: 'Master complex sentence structures for academic writing excellence.',
  unit: 'UNIT 01',
  difficulty: 'Advanced',
  duration: '45 min',
}

describe('LessonCard', () => {
  it('renders lesson title', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders unit label', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders arrow_forward icon', () => {
    render(<LessonCard lesson={mockLesson} />)
    const icon = screen.getByText('arrow_forward')
    expect(icon).toHaveClass('material-symbols-outlined')
  })

  it('has href attribute', () => {
    const { container } = render(<LessonCard lesson={mockLesson} />)
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '#')
  })

  it('applies hover styles via class', () => {
    const { container } = render(<LessonCard lesson={mockLesson} />)
    const link = container.querySelector('a')
    expect(link).toHaveClass('group')
  })
})