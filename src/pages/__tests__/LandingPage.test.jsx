import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders TopNavBar with logo text', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
  })

  it('renders Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy()
  })

  it('renders nav links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
  })

  it('renders hero headline', () => {
    render(<LandingPage />)
    expect(screen.getByText(/Master Academic English with Scholarly Precision/i)).toBeTruthy()
  })

  it('renders CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeTruthy()
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeTruthy()
    expect(screen.getByText('Research Writing')).toBeTruthy()
    expect(screen.getByText('Formal Vocabulary')).toBeTruthy()
  })

  it('renders footer with copyright', () => {
    render(<LandingPage />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeTruthy()
  })

  it('renders footer links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })
})
