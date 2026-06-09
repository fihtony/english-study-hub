import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders the unit label correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders the lesson title correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders the arrow icon', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<LessonCard unit="UNIT 01" title="Test Lesson" onClick={handleClick} />)
    const card = screen.getByRole('button')
    card.click()
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders with correct unit and title combination', () => {
    render(<LessonCard unit="UNIT 02" title="Nuanced Argumentation: The Art of the Thesis" />)
    expect(screen.getByText('UNIT 02')).toBeInTheDocument()
    expect(screen.getByText('Nuanced Argumentation: The Art of the Thesis')).toBeInTheDocument()
  })
})