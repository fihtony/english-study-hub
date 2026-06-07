import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LessonLibraryPage from '../LessonLibraryPage'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('LessonLibraryPage', () => {
  it('renders page title', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders curriculum label', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders all 5 lesson items', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
    expect(screen.getByText('Etymology and the Evolution of Modern Lexicon')).toBeInTheDocument()
    expect(screen.getByText('Nuanced Argumentation: The Art of the Thesis')).toBeInTheDocument()
    expect(screen.getByText('Comparative Literature: Analyzing Cross-Cultural Themes')).toBeInTheDocument()
    expect(screen.getByText('Scientific Methodology and Report Composition')).toBeInTheDocument()
  })

  it('renders unit labels for each lesson', () => {
    renderWithRouter(<LessonLibraryPage />)
    const unit01Labels = screen.getAllByText('UNIT 01')
    const unit02Labels = screen.getAllByText('UNIT 02')
    const unit03Labels = screen.getAllByText('UNIT 03')
    expect(unit01Labels).toHaveLength(2)
    expect(unit02Labels).toHaveLength(2)
    expect(unit03Labels).toHaveLength(1)
  })

  it('renders TopNavBar and Footer', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getByLabelText('Linguist Library Home')).toBeInTheDocument()
    expect(screen.getByLabelText('Sign In')).toBeInTheDocument()
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument()
  })
})