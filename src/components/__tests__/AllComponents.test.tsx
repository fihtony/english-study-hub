import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'
import Footer from '../Footer'
import ArrowForwardIcon from '../ArrowForwardIcon'
import LessonCard from '../LessonCard'
import LessonLibraryPage from '../../pages/LessonLibraryPage'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('TopNavBar', () => {
  it('renders logo text', () => {
    renderWithRouter(<TopNavBar />)
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThan(0)
  })

  it('renders Sign In button', () => {
    renderWithRouter(<TopNavBar />)
    expect(screen.getAllByRole('button', { name: 'Sign In' }).length).toBeGreaterThan(0)
  })
})

describe('Footer', () => {
  it('renders copyright with dynamic year', () => {
    const currentYear = new Date().getFullYear()
    renderWithRouter(<Footer />)
    expect(screen.getAllByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`).length).toBeGreaterThan(0)
  })

  it('renders navigation links', () => {
    renderWithRouter(<Footer />)
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact Support').length).toBeGreaterThan(0)
  })
})

describe('ArrowForwardIcon', () => {
  it('renders SVG element', () => {
    const { container } = render(<ArrowForwardIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('has aria-hidden for accessibility', () => {
    const { container } = render(<ArrowForwardIcon />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})

describe('LessonCard', () => {
  it('renders unit and title', () => {
    render(<LessonCard unit="UNIT 01" title="Test Lesson" />)
    expect(screen.getAllByText('UNIT 01').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Test Lesson').length).toBeGreaterThan(0)
  })

  it('renders with proper lesson href', () => {
    const { container } = render(<LessonCard unit="UNIT 01" title="Test" lessonId="1" />)
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/lessons/1')
  })
})

describe('LessonLibraryPage', () => {
  it('renders heading and curriculum label', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getAllByRole('heading', { name: 'Lesson Library' }).length).toBeGreaterThan(0)
    expect(screen.getAllByText('CURRICULUM').length).toBeGreaterThan(0)
  })

  it('renders all 5 lesson titles', () => {
    renderWithRouter(<LessonLibraryPage />)
    expect(screen.getAllByText('Advanced Syntax in Academic Prose').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Etymology and the Evolution of Modern Lexicon').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Nuanced Argumentation: The Art of the Thesis').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Comparative Literature: Analyzing Cross-Cultural Themes').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Scientific Methodology and Report Composition').length).toBeGreaterThan(0)
  })
})
