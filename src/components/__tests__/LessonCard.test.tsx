import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders unit label correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders lesson title correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders arrow forward icon', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = screen.getByText('arrow_forward')
    expect(icon).toHaveClass('material-symbols-outlined')
  })

  it('has hover state styling', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const link = container.querySelector('a')
    expect(link).toHaveClass('group')
  })

  it('renders different unit labels', () => {
    render(<LessonCard unit="UNIT 03" title="Test Lesson" />)
    expect(screen.getByText('UNIT 03')).toBeInTheDocument()
  })
})
