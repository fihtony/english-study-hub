import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Landing Page', () => {
  it('renders the page without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('displays the brand name in the header', () => {
    render(<App />)
    const elements = screen.getAllByText('Linguist Library')
    expect(elements.length).toBeGreaterThan(0)
  })

  it('renders Sign In button as a button element', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: 'Sign In' })
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons[0].tagName).toBe('BUTTON')
  })

  it('renders navigation links as anchor elements', () => {
    render(<App />)
    const lessonsLink = screen.getAllByRole('link', { name: 'Lessons' })
    expect(lessonsLink.length).toBeGreaterThan(0)
    expect(lessonsLink[0].tagName).toBe('A')
  })

  it('renders all 4 navigation links', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: 'Lessons' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Flashcards' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Progress' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Library' }).length).toBeGreaterThan(0)
  })

  it('renders the hero headline', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Master Academic English with Scholarly Precision/).length).toBeGreaterThan(0)
  })

  it('renders Start Learning Now as a button', () => {
    render(<App />)
    const ctaButtons = screen.getAllByRole('button', { name: 'Start Learning Now' })
    expect(ctaButtons.length).toBeGreaterThan(0)
    expect(ctaButtons[0].tagName).toBe('BUTTON')
  })

  it('renders all 3 category links as anchors', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: /Advanced Grammar/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Research Writing/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Formal Vocabulary/i }).length).toBeGreaterThan(0)
  })

  it('renders footer with dynamic copyright year', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    const copyrightElements = screen.getAllByText(new RegExp(`© ${currentYear}`))
    expect(copyrightElements.length).toBeGreaterThan(0)
  })

  it('renders footer navigation links', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: 'Terms of Service' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Privacy Policy' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Contact Support' }).length).toBeGreaterThan(0)
  })

  it('footer copyright contains brand name', () => {
    render(<App />)
    expect(screen.getAllByText(/Linguist Library/).length).toBeGreaterThan(0)
  })
})
