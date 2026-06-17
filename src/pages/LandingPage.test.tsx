import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the landing page with main heading', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })

  it('renders the navigation with logo', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders the Start Learning Now CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
  })

  it('renders the category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders the footer with copyright', () => {
    render(<LandingPage />)
    expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
  })

  it('renders the footer navigation links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})
