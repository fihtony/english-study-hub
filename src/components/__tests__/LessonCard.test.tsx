import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('UNIT 01')).toBeDefined()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeDefined()
  })

  it('renders with correct unit label', () => {
    const { container } = render(<LessonCard unit="UNIT 02" title="Test Lesson" />)
    expect(container.querySelector('span')?.textContent).toBe('UNIT 02')
  })

  it('renders arrow icon', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test" />)
    const icon = container.querySelector('.material-symbols-outlined')
    expect(icon?.textContent).toBe('arrow_forward')
  })
})