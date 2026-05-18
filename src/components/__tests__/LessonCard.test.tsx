import { describe, it, expect } from 'vitest'
import { LessonCard } from '../LessonCard'
import { render } from '@testing-library/react'

describe('LessonCard', () => {
  it('renders lesson title and description', () => {
    const { getByText } = render(
      <LessonCard
        title="Test Lesson"
        description="Test description"
        difficulty="Beginner"
        duration="30 min"
        unit="Unit 01"
      />
    )
    expect(getByText('Test Lesson')).toBeDefined()
    expect(getByText('Test description')).toBeDefined()
  })

  it('renders difficulty badge correctly', () => {
    const { getByText } = render(
      <LessonCard
        title="Test Lesson"
        description="Test description"
        difficulty="Advanced"
        duration="45 min"
        unit="Unit 01"
      />
    )
    expect(getByText('Advanced')).toBeDefined()
  })

  it('renders duration info', () => {
    const { getByText } = render(
      <LessonCard
        title="Test Lesson"
        description="Test description"
        difficulty="Intermediate"
        duration="30 min"
        unit="Unit 02"
      />
    )
    expect(getByText('30 min')).toBeDefined()
  })

  it('renders unit label', () => {
    const { getByText } = render(
      <LessonCard
        title="Test Lesson"
        description="Test description"
        difficulty="Beginner"
        duration="20 min"
        unit="Unit 03"
      />
    )
    expect(getByText('Unit 03')).toBeDefined()
  })
})