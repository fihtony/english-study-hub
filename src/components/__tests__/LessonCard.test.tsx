import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title correctly', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax in Academic Prose" />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders ArrowForwardIcon', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('renders the card with correct structure', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    const card = screen.getByText('Test Lesson').closest('div')
    expect(card).toBeInTheDocument()
    expect(card?.tagName).toBe('DIV')
  })
})