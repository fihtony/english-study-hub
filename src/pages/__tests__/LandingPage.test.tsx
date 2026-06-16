import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the main headline', () => {
    render(<LandingPage />)
    const headline = screen.getByRole('heading', { level: 1 })
    expect(headline).toBeInTheDocument()
    expect(headline).toHaveTextContent('Master Academic English with Scholarly Precision.')
  })

  it('renders the primary CTA button', () => {
    render(<LandingPage />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders all three category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders the header with logo text', () => {
    render(<LandingPage />)
    const logo = screen.getByText('Linguist Library')
    expect(logo).toBeInTheDocument()
  })

  it('renders the header navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders the Sign In button in header', () => {
    render(<LandingPage />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })


  it('renders the footer with copyright text', () => {
    render(<LandingPage />)
    expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
  })

  it('renders footer navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})
