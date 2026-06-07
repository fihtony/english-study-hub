import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LessonCard from '../LessonCard'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('LessonCard', () => {
  it('renders unit label and title', () => {
    renderWithRouter(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders with correct href when provided', () => {
    renderWithRouter(<LessonCard unit="UNIT 01" title="Test Lesson" href="/lessons/1" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lessons/1')
  })

  it('renders arrow icon', () => {
    renderWithRouter(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = document.querySelector('.material-symbols-outlined')
    expect(icon).toBeInTheDocument()
  })

  it('applies hover styling through classname', () => {
    renderWithRouter(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('group')
    expect(link).toHaveClass('hover:bg-surface-container-low')
  })
})