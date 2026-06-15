/// <reference types="vitest/globals" />
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

// Wrapper component for Router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LandingPage', () => {
  it('renders the main heading', () => {
    renderWithRouter(<LandingPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain('Master Academic English')
  })

  it('renders the primary CTA button', () => {
    renderWithRouter(<LandingPage />)
    const ctaButton = screen.getByRole('button', { name: /start learning now/i })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders the site logo', () => {
    renderWithRouter(<LandingPage />)
    const logo = screen.getByText('Linguist Library')
    expect(logo).toBeInTheDocument()
  })


  it('renders navigation links', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    renderWithRouter(<LandingPage />)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('renders category links', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders footer with copyright', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText(/© 2024 Linguist Library/i)).toBeInTheDocument()
  })

  it('renders footer links', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})
