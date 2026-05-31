import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('LandingPage', () => {
  it('renders header with logo text', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(<App />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders main headline', () => {
    render(<App />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })

  it('renders Start Learning Now CTA button', () => {
    render(<App />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders category links', () => {
    render(<App />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders footer with copyright', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Linguist Library`))).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<App />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('renders footer with nav element and proper role', () => {
    render(<App />)
    const footer = document.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('renders header with header element', () => {
    render(<App />)
    const header = document.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('renders main with main element', () => {
    render(<App />)
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('CTA button has correct type attribute', () => {
    render(<App />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toHaveAttribute('type', 'button')
  })

  it('Sign In button has correct type attribute', () => {
    render(<App />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toHaveAttribute('type', 'button')
  })
})
