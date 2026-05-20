import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LessonCard from '../../components/LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax')).toBeInTheDocument()
  })

  it('renders arrow_forward icon', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = screen.getByText('arrow_forward')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('material-symbols-outlined')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LessonCard unit="UNIT 01" title="Test Lesson" onClick={onClick} />)
    await user.click(screen.getByText('Test Lesson'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('applies hover state classes', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const link = container.querySelector('a')
    expect(link).toHaveClass('group')
  })
})