import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LessonLibraryPage from '../pages/LessonLibraryPage'

describe('LessonLibraryPage', () => {
  it('renders page title "Lesson Library"', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
  })

  it('renders "CURRICULUM" label', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders all 5 lesson items', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
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

  it('renders correct unit labels', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getAllByText('UNIT 01')).toHaveLength(2)
    expect(screen.getAllByText('UNIT 02')).toHaveLength(2)
    expect(screen.getByText('UNIT 03')).toBeInTheDocument()
  })

  it('lesson cards have proper accessibility labels', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('UNIT 01: Advanced Syntax in Academic Prose')).toBeInTheDocument()
    expect(screen.getByLabelText('UNIT 03: Scientific Methodology and Report Composition')).toBeInTheDocument()
  })
})
