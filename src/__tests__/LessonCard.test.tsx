import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LessonCard } from '../../src/components/LessonCard'

describe('LessonCard', () => {
  const mockLesson = { unit: 'UNIT 01', title: 'Test Lesson Title' }

  it('renders lesson unit and title', () => {
    render(
      <BrowserRouter>
        <LessonCard lesson={mockLesson} />
      </BrowserRouter>
    )
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Test Lesson Title')).toBeInTheDocument()
  })

  it('renders with correct structure', () => {
    render(
      <BrowserRouter>
        <LessonCard lesson={mockLesson} />
      </BrowserRouter>
    )
    const unitLabel = screen.getByText('UNIT 01')
    const title = screen.getByText('Test Lesson Title')
    expect(unitLabel).toHaveClass('font-label-caps')
    expect(title).toHaveClass('font-h3')
  })

  it('calls onClick with lesson when clicked', () => {
    const onClick = vi.fn()
    render(
      <BrowserRouter>
        <LessonCard lesson={mockLesson} onClick={onClick} />
      </BrowserRouter>
    )
    const button = screen.getByRole('button')
    button.click()
    expect(onClick).toHaveBeenCalledWith(mockLesson)
  })

  it('renders without onClick handler', () => {
    render(
      <BrowserRouter>
        <LessonCard lesson={mockLesson} />
      </BrowserRouter>
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})