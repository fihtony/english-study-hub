import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  const mockLesson = {
    id: 'test-id',
    unit: 'UNIT 01',
    title: 'Test Lesson Title'
  }

  it('renders lesson unit and title', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Test Lesson Title')).toBeInTheDocument()
  })

  it('renders with correct href', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lessons/test-id')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} onClick={handleClick} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    link.click()
    expect(handleClick).toHaveBeenCalledWith(mockLesson)
  })

  it('has aria-label with unit and title', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', 'UNIT 01: Test Lesson Title')
  })
})