import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders hero headline', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders nav logo', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders footer copyright', () => {
    render(<LandingPage />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })
})