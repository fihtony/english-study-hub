import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  const mockLesson = {
    id: '1',
    unit: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
  }

  it('renders lesson title and unit', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders with correct href attribute', () => {
    render(<LessonCard lesson={mockLesson} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '#')
  })

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LessonCard lesson={mockLesson} onClick={onClick} />)
    await user.click(screen.getByRole('link'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has accessible aria-label', () => {
    render(<LessonCard lesson={mockLesson} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', 'Advanced Syntax in Academic Prose - UNIT 01')
  })

  it('contains ArrowForwardIcon', () => {
    render(<LessonCard lesson={mockLesson} />)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})