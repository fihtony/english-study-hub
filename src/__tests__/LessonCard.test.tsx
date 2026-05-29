import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../components/LessonCard'

describe('LessonCard', () => {
  it('renders unit label and title', () => {
    render(<LessonCard unitLabel="UNIT 01" title="Test Lesson Title" />)
    expect(screen.getByText('UNIT 01')).toBeTruthy()
    expect(screen.getByText('Test Lesson Title')).toBeTruthy()
  })

  it('renders as a link', () => {
    render(<LessonCard unitLabel="UNIT 01" title="Test Lesson" />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toBeTruthy()
  })
})