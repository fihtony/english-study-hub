import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonLibraryPage from '../../pages/LessonLibraryPage'

describe('LessonLibraryPage', () => {
  it('renders the page title', () => {
    render(<LessonLibraryPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toBe('Lesson Library')
  })

  it('renders the curriculum label', () => {
    render(<LessonLibraryPage />)
    const labels = screen.getAllByText('CURRICULUM')
    expect(labels.length).toBeGreaterThan(0)
  })

  it('renders lesson items', () => {
    render(<LessonLibraryPage />)
    const lessonTitles = [
      'Advanced Syntax in Academic Prose',
      'Etymology and the Evolution of Modern Lexicon',
      'Nuanced Argumentation: The Art of the Thesis',
      'Comparative Literature: Analyzing Cross-Cultural Themes',
      'Scientific Methodology and Report Composition'
    ]
    lessonTitles.forEach(title => {
      const elements = screen.getAllByText(title)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders unit labels', () => {
    render(<LessonLibraryPage />)
    const unitLabels = screen.getAllByText(/UNIT 0/)
    expect(unitLabels.length).toBeGreaterThanOrEqual(5)
  })

  it('renders navigation items', () => {
    render(<LessonLibraryPage />)
    const navItems = ['Lessons', 'Flashcards', 'Progress', 'Library']
    navItems.forEach(item => {
      const elements = screen.getAllByText(item)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders sign in button', () => {
    render(<LessonLibraryPage />)
    const buttons = screen.getAllByRole('button')
    const signInButtons = buttons.filter(b => b.textContent === 'Sign In')
    expect(signInButtons.length).toBeGreaterThan(0)
  })

  it('renders footer with copyright', () => {
    render(<LessonLibraryPage />)
    const copyrightElements = screen.getAllByText(/© 2024 Linguist Library/)
    expect(copyrightElements.length).toBeGreaterThan(0)
  })

  it('renders footer links', () => {
    render(<LessonLibraryPage />)
    const footerLinks = ['Terms of Service', 'Privacy Policy', 'Contact Support']
    footerLinks.forEach(link => {
      const elements = screen.getAllByText(link)
      expect(elements.length).toBeGreaterThan(0)
    })
  })
})