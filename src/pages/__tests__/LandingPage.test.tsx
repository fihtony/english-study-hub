import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders header with logo text', () => {
    render(<LandingPage />)
    const logo = screen.getByText('Linguist Library')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('renders hero headline', () => {
    render(<LandingPage />)
    expect(screen.getByRole('heading', { name: 'Master Academic English with Scholarly Precision.' })).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeInTheDocument()
  })

  it('renders three category links', () => {
    render(<LandingPage />)
    const grammarLinks = screen.getAllByText('Advanced Grammar')
    const writingLinks = screen.getAllByText('Research Writing')
    const vocabLinks = screen.getAllByText('Formal Vocabulary')
    expect(grammarLinks.length).toBeGreaterThan(0)
    expect(writingLinks.length).toBeGreaterThan(0)
    expect(vocabLinks.length).toBeGreaterThan(0)
  })

  it('renders footer with copyright', () => {
    render(<LandingPage />)
    const copyrightElements = screen.getAllByText(/© 2024 Linguist Library/)
    expect(copyrightElements.length).toBeGreaterThan(0)
  })

  it('renders footer legal links', () => {
    render(<LandingPage />)
    const termsLinks = screen.getAllByText('Terms of Service')
    const privacyLinks = screen.getAllByText('Privacy Policy')
    const contactLinks = screen.getAllByText('Contact Support')
    expect(termsLinks.length).toBeGreaterThan(0)
    expect(privacyLinks.length).toBeGreaterThan(0)
    expect(contactLinks.length).toBeGreaterThan(0)
  })
})