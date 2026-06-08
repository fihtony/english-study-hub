import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LessonLibraryPage from '../LessonLibraryPage'

describe('LessonLibraryPage', () => {
  it('renders page title', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders curriculum label', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders all 5 lesson titles', () => {
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

  it('renders unit labels', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const unit01Labels = screen.getAllByText('UNIT 01')
    expect(unit01Labels).toHaveLength(2)
    const unit02Labels = screen.getAllByText('UNIT 02')
    expect(unit02Labels).toHaveLength(2)
    const unit03Labels = screen.getAllByText('UNIT 03')
    expect(unit03Labels).toHaveLength(1)
  })
})