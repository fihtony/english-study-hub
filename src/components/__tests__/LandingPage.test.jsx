import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the page title', () => {
    render(<LandingPage />)
    const title = screen.getByText(/Master Academic English with Scholarly Precision/i)
    expect(title).toBeInTheDocument()
  })

  it('renders navigation logo', () => {
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

  it('renders sign in button in header', () => {
    render(<LandingPage />)
    const signInButtons = screen.getAllByText('Sign In')
    expect(signInButtons.length).toBeGreaterThan(0)
  })

  it('renders CTA button', () => {
    render(<LandingPage />)
    const ctaButton = screen.getByText('Start Learning Now')
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(<LandingPage />)
    const copyright = screen.getByText(/© 2024 Linguist Library/i)
    expect(copyright).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<LandingPage />)
    const footerLinks = screen.getAllByText(/Terms of Service|Privacy Policy|Contact Support/i)
    expect(footerLinks.length).toBeGreaterThan(0)
  })

  it('has stitch node ids on key elements', () => {
    const { container } = render(<LandingPage />)
    expect(container.querySelector('[data-stitch-id="nav_logo"]')).toBeInTheDocument()
    expect(container.querySelector('[data-stitch-id="hero_title"]')).toBeInTheDocument()
    expect(container.querySelector('[data-stitch-id="cta_button"]')).toBeInTheDocument()
    expect(container.querySelector('[data-stitch-id="footer"]')).toBeInTheDocument()
  })

  it('CTA button uses design token class', () => {
    const { container } = render(<LandingPage />)
    const ctaButton = container.querySelector('[data-stitch-id="cta_button"]')
    expect(ctaButton.className).toContain('bg-on-tertiary-container')
  })

  it('uses Work Sans font on all text elements', () => {
    const { container } = render(<LandingPage />)
    const titleElement = container.querySelector('[data-stitch-id="hero_title"]')
    const logoElement = container.querySelector('[data-stitch-id="nav_logo"]')
    expect(titleElement.className).toContain("font-['Work_Sans']")
    expect(logoElement.className).toContain("font-['Work_Sans']")
  })

  it('has proper responsive classes for mobile and desktop', () => {
    const { container } = render(<LandingPage />)
    const navMenu = container.querySelector('nav')
    expect(navMenu.className).toContain('hidden')
    expect(navMenu.className).toContain('md:flex')
  })
})
