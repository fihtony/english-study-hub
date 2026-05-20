import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders unit and title correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" />)
    expect(screen.getByText('UNIT 01')).toBeDefined()
    expect(screen.getByText('Advanced Syntax')).toBeDefined()
  })

  it('renders with default href', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const link = container.querySelector('a')
    expect(link?.getAttribute('href')).toBe('#')
  })

  it('renders with custom href', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" href="/lesson/1" />)
    const link = container.querySelector('a')
    expect(link?.getAttribute('href')).toBe('/lesson/1')
  })

  it('contains arrow_forward icon', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = container.querySelector('.material-symbols-outlined')
    expect(icon?.textContent).toBe('arrow_forward')
  })

  it('applies hover styles via Tailwind classes', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const link = container.querySelector('a')
    expect(link?.className).toContain('hover:bg-surface-container-low')
    expect(link?.className).toContain('group')
  })
})