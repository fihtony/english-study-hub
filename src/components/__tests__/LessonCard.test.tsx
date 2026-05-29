import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title', () => {
    render(<LessonCard unitLabel="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('applies hover styles via group class', () => {
    const { container } = render(
      <LessonCard unitLabel="UNIT 01" title="Test Lesson" />
    )
    const anchor = container.querySelector('a')
    expect(anchor?.className).toContain('group')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<LessonCard unitLabel="UNIT 01" title="Test Lesson" onClick={onClick} />)
    fireEvent.click(screen.getByText('Test Lesson'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as an anchor element with role button', () => {
    const { container } = render(
      <LessonCard unitLabel="UNIT 01" title="Test Lesson" />
    )
    const anchor = container.querySelector('a')
    expect(anchor?.getAttribute('role')).toBe('button')
    expect(anchor?.getAttribute('href')).toBe('#')
  })
})