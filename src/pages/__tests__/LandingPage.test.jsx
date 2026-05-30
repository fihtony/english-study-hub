import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the page without crashing', () => {
    render(<LandingPage />)
    expect(screen.getByRole('main')).toBeTruthy()
  })

  it('displays the main headline', () => {
    render(<LandingPage />)
    const headline = screen.getByText(/Master Academic English with Scholarly Precision/)
    expect(headline).toBeTruthy()
    expect(headline.tagName).toBe('H1')
  })

  it('displays the CTA button', () => {
    render(<LandingPage />)
    const ctaButton = screen.getByRole('button', { name: /Start Learning Now/i })
    expect(ctaButton).toBeTruthy()
  })

  it('displays the Sign In button', () => {
    render(<LandingPage />)
    const signInButton = screen.getByRole('button', { name: /Sign In/i })
    expect(signInButton).toBeTruthy()
  })

  it('displays navigation links', () => {
    render(<LandingPage />)
    const lessons = screen.getAllByText(/Lessons/i)
    const flashcards = screen.getAllByText(/Flashcards/i)
    const progress = screen.getAllByText(/Progress/i)
    const library = screen.getAllByText(/^Library$/i)
    expect(lessons.length).toBeGreaterThan(0)
    expect(flashcards.length).toBeGreaterThan(0)
    expect(progress.length).toBeGreaterThan(0)
    expect(library.length).toBeGreaterThan(0)
  })

  it('displays category links', () => {
    render(<LandingPage />)
    expect(screen.getByText(/Advanced Grammar/i)).toBeTruthy()
    expect(screen.getByText(/Research Writing/i)).toBeTruthy()
    expect(screen.getByText(/Formal Vocabulary/i)).toBeTruthy()
  })

  it('displays footer with copyright', () => {
    render(<LandingPage />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Linguist Library`))).toBeTruthy()
  })

  it('displays footer links', () => {
    render(<LandingPage />)
    expect(screen.getByText(/Terms of Service/i)).toBeTruthy()
    expect(screen.getByText(/Privacy Policy/i)).toBeTruthy()
    expect(screen.getByText(/Contact Support/i)).toBeTruthy()
  })

  it('displays logo text', () => {
    render(<LandingPage />)
    const logos = screen.getAllByText(/Linguist Library/i)
    expect(logos.length).toBeGreaterThan(0)
    // Logo should be in header, first occurrence
    expect(logos[0]).toBeTruthy()
  })
})
