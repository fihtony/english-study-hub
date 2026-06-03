import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LessonLibraryPage from '../pages/LessonLibraryPage'

test('renders Lesson Library page at /lessons', () => {
  render(
    <MemoryRouter initialEntries={['/lessons']}>
      <LessonLibraryPage />
    </MemoryRouter>
  )

  expect(screen.getByText('Lesson Library')).toBeInTheDocument()
})

test('displays exactly 5 lesson items', () => {
  render(
    <MemoryRouter initialEntries={['/lessons']}>
      <LessonLibraryPage />
    </MemoryRouter>
  )

  // Get lesson titles - should be exactly 5
  const lessonTitles = [
    'Advanced Syntax in Academic Prose',
    'Etymology and the Evolution of Modern Lexicon',
    'Nuanced Argumentation: The Art of the Thesis',
    'Comparative Literature: Analyzing Cross-Cultural Themes',
    'Scientific Methodology and Report Composition',
  ]

  lessonTitles.forEach(title => {
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})

test('page has correct header text', () => {
  render(
    <MemoryRouter initialEntries={['/lessons']}>
      <LessonLibraryPage />
    </MemoryRouter>
  )

  expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
})