import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonLibraryPage from '../../pages/LessonLibraryPage'
import { MemoryRouter } from 'react-router-dom'

describe('LessonLibraryPage', () => {
  it('renders curriculum label', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders page title', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders all 5 lesson cards', () => {
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

  it('renders TopNavBar and Footer', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
  })
})