import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders the unit label correctly', () => {
    render(
      <LessonCard
        unitLabel="UNIT 01"
        lessonTitle="Advanced Syntax in Academic Prose"
      />
    )
    expect(screen.getByText('UNIT 01')).toBeDefined()
  })

  it('renders the lesson title correctly', () => {
    render(
      <LessonCard
        unitLabel="UNIT 01"
        lessonTitle="Advanced Syntax in Academic Prose"
      />
    )
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeDefined()
  })

  it('renders with correct structure', () => {
    const { container } = render(
      <LessonCard
        unitLabel="UNIT 02"
        lessonTitle="Nuanced Argumentation: The Art of the Thesis"
      />
    )
    const anchor = container.querySelector('a')
    expect(anchor).toBeDefined()
    expect(anchor?.className).toContain('group')
    expect(anchor?.className).toContain('flex')
    expect(anchor?.className).toContain('items-center')
    expect(anchor?.className).toContain('justify-between')
  })

  it('contains arrow forward icon', () => {
    const { container } = render(
      <LessonCard
        unitLabel="UNIT 01"
        lessonTitle="Test Lesson"
      />
    )
    const svg = container.querySelector('svg')
    expect(svg).toBeDefined()
  })
})