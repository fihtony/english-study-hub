import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders unit label', () => {
    render(
      <MemoryRouter>
        <LessonCard unit="UNIT 01" title="Test Lesson" />
      </MemoryRouter>
    )
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders lesson title', () => {
    render(
      <MemoryRouter>
        <LessonCard unit="UNIT 01" title="Test Lesson" />
      </MemoryRouter>
    )
    expect(screen.getByText('Test Lesson')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(
      <MemoryRouter>
        <LessonCard unit="UNIT 01" title="Test Lesson" onClick={handleClick} />
      </MemoryRouter>
    )
    await userEvent.click(screen.getByText('Test Lesson'))
    expect(handleClick).toHaveBeenCalled()
  })
})