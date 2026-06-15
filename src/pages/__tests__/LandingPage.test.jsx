import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the page without crashing', () => {
    render(<LandingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('displays the main heading text', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })

  it('renders navigation links with correct hrefs', () => {
    render(<LandingPage />)
    const lessonsLinks = screen.getAllByRole('link', { name: 'Lessons' })
    expect(lessonsLinks.length).toBeGreaterThan(0)
    expect(lessonsLinks[0].getAttribute('href')).toBe('/lessons')
    const flashcardsLinks = screen.getAllByRole('link', { name: 'Flashcards' })
    expect(flashcardsLinks.length).toBeGreaterThan(0)
    expect(flashcardsLinks[0].getAttribute('href')).toBe('/flashcards')
    const progressLinks = screen.getAllByRole('link', { name: 'Progress' })
    expect(progressLinks.length).toBeGreaterThan(0)
    expect(progressLinks[0].getAttribute('href')).toBe('/progress')
    const libraryLinks = screen.getAllByRole('link', { name: 'Library' })
    expect(libraryLinks.length).toBeGreaterThan(0)
    expect(libraryLinks[0].getAttribute('href')).toBe('/library')
  })

  it('renders Sign In button', () => {
    render(<LandingPage />)
    const signInButtons = screen.getAllByRole('button', { name: 'Sign In' })
    expect(signInButtons.length).toBeGreaterThan(0)
  })

  it('renders CTA button with correct text', () => {
    render(<LandingPage />)
    const ctaButtons = screen.getAllByRole('button', { name: 'Start Learning Now' })
    expect(ctaButtons.length).toBeGreaterThan(0)
  })

  it('CTA button has click handler', async () => {
    const user = userEvent.setup()
    render(<LandingPage />)
    const ctaButtons = screen.getAllByRole('button', { name: 'Start Learning Now' })
    await user.click(ctaButtons[0])
  })

  it('renders all three category links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Advanced Grammar').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Research Writing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Formal Vocabulary').length).toBeGreaterThan(0)
  })

  it('category links are anchor elements with correct hrefs', () => {
    render(<LandingPage />)
    const grammarLinks = screen.getAllByRole('link', { name: /Advanced Grammar/i })
    expect(grammarLinks.length).toBeGreaterThan(0)
    expect(grammarLinks[0].getAttribute('href')).toBe('/advanced-grammar')
    const writingLinks = screen.getAllByRole('link', { name: /Research Writing/i })
    expect(writingLinks.length).toBeGreaterThan(0)
    expect(writingLinks[0].getAttribute('href')).toBe('/research-writing')
    const vocabLinks = screen.getAllByRole('link', { name: /Formal Vocabulary/i })
    expect(vocabLinks.length).toBeGreaterThan(0)
    expect(vocabLinks[0].getAttribute('href')).toBe('/formal-vocabulary')
  })

  it('renders footer with copyright', () => {
    render(<LandingPage />)
    const currentYear = new Date().getFullYear()
    const copyrightTexts = screen.getAllByText(new RegExp(`© ${currentYear} Linguist Library`))
    expect(copyrightTexts.length).toBeGreaterThan(0)
  })

  it('renders footer links with correct hrefs', () => {
    render(<LandingPage />)
    const termsLinks = screen.getAllByRole('link', { name: 'Terms of Service' })
    expect(termsLinks.length).toBeGreaterThan(0)
    expect(termsLinks[0].getAttribute('href')).toBe('/terms')
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' })
    expect(privacyLinks.length).toBeGreaterThan(0)
    expect(privacyLinks[0].getAttribute('href')).toBe('/privacy')
    const contactLinks = screen.getAllByRole('link', { name: 'Contact Support' })
    expect(contactLinks.length).toBeGreaterThan(0)
    expect(contactLinks[0].getAttribute('href')).toBe('/contact')
  })

  it('has navigation landmark', () => {
    render(<LandingPage />)
    const navs = screen.getAllByRole('navigation')
    expect(navs.length).toBeGreaterThan(0)
  })

  it('has main landmark', () => {
    render(<LandingPage />)
    const mains = screen.getAllByRole('main')
    expect(mains.length).toBeGreaterThan(0)
  })

  it('has contentinfo landmark', () => {
    render(<LandingPage />)
    const contents = screen.getAllByRole('contentinfo')
    expect(contents.length).toBeGreaterThan(0)
  })

  it('displays Linguist Library logo text', () => {
    render(<LandingPage />)
    const logos = screen.getAllByText('Linguist Library')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('Sign In button is a button element', () => {
    render(<LandingPage />)
    const signInButtons = screen.getAllByRole('button', { name: 'Sign In' })
    expect(signInButtons.length).toBeGreaterThan(0)
  })
})