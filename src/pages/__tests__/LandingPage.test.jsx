import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders headline text', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
  })

  it('renders CTA button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Start Learning Now').length).toBeGreaterThan(0)
  })

  it('renders navigation links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Lessons').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Flashcards').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Progress').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Library').length).toBeGreaterThan(0)
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Advanced Grammar').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Research Writing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Formal Vocabulary').length).toBeGreaterThan(0)
  })

  it('renders footer copyright', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('© 2024 Linguist Library. Premium Academic English Study.').length).toBeGreaterThan(0)
  })

  it('renders footer links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact Support').length).toBeGreaterThan(0)
  })

  it('renders logo text', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThan(0)
  })

  it('renders sign in button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0)
  })
})