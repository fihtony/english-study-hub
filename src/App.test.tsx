import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Landing Page', () => {
  it('renders the logo text', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders the h1 headline with correct text', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Master Academic English with Scholarly Precision.')
  })

  it('renders Sign In as a button element', () => {
    render(<App />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
    expect(signInButton.tagName).toBe('BUTTON')
  })

  it('renders CTA button as a button element', () => {
    render(<App />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton.tagName).toBe('BUTTON')
  })

  it('renders navigation links in the nav element', () => {
    render(<App />)
    const nav = document.querySelector('nav[aria-label="Main navigation"]')
    expect(nav).toBeInTheDocument()
    const links = nav!.querySelectorAll('a')
    expect(links).toHaveLength(4)
  })

  it('renders Lessons link with correct href', () => {
    render(<App />)
    const lessonsLink = document.querySelector('a[href="/lessons"]')
    expect(lessonsLink).toBeInTheDocument()
    expect(lessonsLink?.textContent).toBe('Lessons')
  })

  it('renders Flashcards link with correct href', () => {
    render(<App />)
    const flashcardsLink = document.querySelector('a[href="/flashcards"]')
    expect(flashcardsLink).toBeInTheDocument()
    expect(flashcardsLink?.textContent).toBe('Flashcards')
  })

  it('renders Progress link with correct href', () => {
    render(<App />)
    const progressLink = document.querySelector('a[href="/progress"]')
    expect(progressLink).toBeInTheDocument()
    expect(progressLink?.textContent).toBe('Progress')
  })

  it('renders Library link with correct href', () => {
    render(<App />)
    const libraryLink = document.querySelector('a[href="/library"]')
    expect(libraryLink).toBeInTheDocument()
    expect(libraryLink?.textContent).toBe('Library')
  })

  it('renders all 3 category links with correct hrefs', () => {
    render(<App />)

    const grammarLink = document.querySelector('a[href="/lessons/advanced-grammar"]')
    expect(grammarLink).toBeInTheDocument()
    expect(grammarLink?.textContent?.includes('Advanced Grammar')).toBe(true)

    const writingLink = document.querySelector('a[href="/lessons/research-writing"]')
    expect(writingLink).toBeInTheDocument()
    expect(writingLink?.textContent?.includes('Research Writing')).toBe(true)

    const vocabLink = document.querySelector('a[href="/lessons/formal-vocabulary"]')
    expect(vocabLink).toBeInTheDocument()
    expect(vocabLink?.textContent?.includes('Formal Vocabulary')).toBe(true)
  })

  it('renders footer copyright with current year', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Linguist Library`))).toBeInTheDocument()
  })

  it('renders all 3 footer links with correct hrefs', () => {
    render(<App />)

    const termsLink = document.querySelector('a[href="/terms"]')
    expect(termsLink).toBeInTheDocument()
    expect(termsLink?.textContent).toBe('Terms of Service')

    const privacyLink = document.querySelector('a[href="/privacy"]')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink?.textContent).toBe('Privacy Policy')

    const contactLink = document.querySelector('a[href="/contact"]')
    expect(contactLink).toBeInTheDocument()
    expect(contactLink?.textContent).toBe('Contact Support')
  })

  it('has proper ARIA landmark roles', () => {
    render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('CTA button has click handler', () => {
    render(<App />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    let clicked = false
    ctaButton.addEventListener('click', () => { clicked = true })
    ctaButton.click()
    expect(clicked).toBe(true)
  })

  it('arrow icons are present for category links', () => {
    render(<App />)
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThanOrEqual(3)
  })
})