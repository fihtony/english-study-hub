import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonCard from '../LessonCard'

const mockLesson = {
  id: '1',
  unit: 'UNIT 01',
  title: 'Advanced Syntax in Academic Prose',
}

test('renders lesson title and unit label', () => {
  render(<LessonCard lesson={mockLesson} />)

  expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  expect(screen.getByText('UNIT 01')).toBeInTheDocument()
})

test('renders with correct structure', () => {
  render(<LessonCard lesson={mockLesson} />)

  const card = screen.getByRole('link')
  expect(card).toBeInTheDocument()
  expect(card).toHaveAttribute('href', '#')
})

test('displays arrow icon', () => {
  render(<LessonCard lesson={mockLesson} />)

  const icon = document.querySelector('svg')
  expect(icon).toBeInTheDocument()
})