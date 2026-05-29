import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('UNIT 01')).toBeTruthy()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeTruthy()
  })

  it('renders arrow icon', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('applies hover styling classes', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const anchor = container.querySelector('a')
    expect(anchor?.className).toContain('hover:bg-surface-container-low')
  })

  it('has correct href attribute', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const anchor = container.querySelector('a')
    expect(anchor?.getAttribute('href')).toBe('#')
  })
})