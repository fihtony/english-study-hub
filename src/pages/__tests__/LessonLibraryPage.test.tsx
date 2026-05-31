import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import LessonLibraryPage from '../LessonLibraryPage'

describe('LessonLibraryPage', () => {
  it('renders page heading', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders CURRICULUM label', () => {
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
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
    expect(screen.getByText('Etymology and the Evolution of Modern Lexicon')).toBeInTheDocument()
    expect(screen.getByText('Nuanced Argumentation: The Art of the Thesis')).toBeInTheDocument()
    expect(screen.getByText('Comparative Literature: Analyzing Cross-Cultural Themes')).toBeInTheDocument()
    expect(screen.getByText('Scientific Methodology and Report Composition')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/© \d{4} Linguist Library/)).toBeInTheDocument()
  })
})