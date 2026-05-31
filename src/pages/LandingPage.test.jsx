import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the landing page without crashing', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
  })

  it('renders the main headline', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
  })

  it('renders the primary CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Start Learning Now')).toBeDefined()
  })

  it('renders navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeDefined()
    expect(screen.getByText('Flashcards')).toBeDefined()
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('Library')).toBeDefined()
  })

  it('renders the Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Sign In')).toBeDefined()
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeDefined()
    expect(screen.getByText('Research Writing')).toBeDefined()
    expect(screen.getByText('Formal Vocabulary')).toBeDefined()
  })

  it('renders the footer with copyright', () => {
    render(<LandingPage />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeDefined()
  })

  it('renders footer navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeDefined()
    expect(screen.getByText('Privacy Policy')).toBeDefined()
    expect(screen.getByText('Contact Support')).toBeDefined()
  })
})