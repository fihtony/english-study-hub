import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import LessonCard from '../LessonCard'

const mockLesson = { id: '1', unit: 'UNIT 01', title: 'Test Lesson Title' }

describe('LessonCard', () => {
  it('renders lesson unit label', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders lesson title', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    expect(screen.getByText('Test Lesson Title')).toBeInTheDocument()
  })

  it('renders arrow icon', () => {
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('lesson card is clickable', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <LessonCard lesson={mockLesson} />
      </MemoryRouter>
    )
    const card = screen.getByRole('link')
    await user.click(card)
    expect(card).toHaveAttribute('href', '/lesson/1')
  })
})