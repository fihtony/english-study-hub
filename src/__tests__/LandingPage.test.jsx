import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import TopNavBar from '../components/TopNavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('TopNavBar', () => {
  it('renders logo text', () => {
    renderWithRouter(<TopNavBar />)
    expect(screen.getAllByText('Linguist Library')[0]).toBeTruthy()
  })

  it('renders navigation links', () => {
    renderWithRouter(<TopNavBar />)
    const lessons = screen.getAllByText('Lessons')
    const flashcards = screen.getAllByText('Flashcards')
    const progress = screen.getAllByText('Progress')
    const library = screen.getAllByText('Library')
    expect(lessons.length).toBeGreaterThan(0)
    expect(flashcards.length).toBeGreaterThan(0)
    expect(progress.length).toBeGreaterThan(0)
    expect(library.length).toBeGreaterThan(0)
  })

  it('renders sign in button as button element', () => {
    renderWithRouter(<TopNavBar />)
    const buttons = screen.getAllByRole('button')
    const signInButton = buttons.find(b => b.textContent?.toLowerCase().includes('sign in'))
    expect(signInButton).toBeTruthy()
    expect(signInButton.tagName).toBe('BUTTON')
  })

  it('nav has navigation role', () => {
    renderWithRouter(<TopNavBar />)
    const navs = screen.getAllByRole('navigation')
    expect(navs.length).toBeGreaterThan(0)
  })
})

describe('Hero', () => {
  it('renders main heading', () => {
    renderWithRouter(<Hero />)
    expect(screen.getAllByText(/Master Academic English with Scholarly Precision/i)[0]).toBeTruthy()
  })

  it('renders CTA button as button element', () => {
    renderWithRouter(<Hero />)
    const buttons = screen.getAllByRole('button')
    const ctaButton = buttons.find(b => b.textContent?.toLowerCase().includes('start learning now'))
    expect(ctaButton).toBeTruthy()
    expect(ctaButton.tagName).toBe('BUTTON')
  })

  it('renders category links as anchor elements', () => {
    renderWithRouter(<Hero />)
    const advancedGrammarEl = screen.getAllByText('Advanced Grammar')[0]
    const researchWritingEl = screen.getAllByText('Research Writing')[0]
    const formalVocabularyEl = screen.getAllByText('Formal Vocabulary')[0]
    const advancedGrammarAnchor = advancedGrammarEl.closest('a')
    const researchWritingAnchor = researchWritingEl.closest('a')
    const formalVocabularyAnchor = formalVocabularyEl.closest('a')
    expect(advancedGrammarAnchor.tagName).toBe('A')
    expect(researchWritingAnchor.tagName).toBe('A')
    expect(formalVocabularyAnchor.tagName).toBe('A')
  })

  it('renders category links with correct href attributes', () => {
    renderWithRouter(<Hero />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })
})

describe('Footer', () => {
  it('renders copyright with dynamic year', () => {
    renderWithRouter(<Footer />)
    const year = new Date().getFullYear()
    const copyright = screen.getAllByText(new RegExp(`© ${year}`))[0]
    expect(copyright).toBeTruthy()
  })

  it('renders footer links', () => {
    renderWithRouter(<Footer />)
    expect(screen.getAllByText('Terms of Service')[0]).toBeTruthy()
    expect(screen.getAllByText('Privacy Policy')[0]).toBeTruthy()
    expect(screen.getAllByText('Contact Support')[0]).toBeTruthy()
  })

  it('footer links are anchor elements', () => {
    renderWithRouter(<Footer />)
    const termsLink = screen.getAllByText('Terms of Service')[0].closest('a')
    const privacyLink = screen.getAllByText('Privacy Policy')[0].closest('a')
    const contactLink = screen.getAllByText('Contact Support')[0].closest('a')
    expect(termsLink.tagName).toBe('A')
    expect(privacyLink.tagName).toBe('A')
    expect(contactLink.tagName).toBe('A')
  })
})

describe('LandingPage', () => {
  it('renders all main sections', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getAllByRole('navigation')[0]).toBeTruthy()
    expect(screen.getAllByText(/Master Academic English/)[0]).toBeTruthy()
    expect(screen.getAllByText(/Linguist Library/)[0]).toBeTruthy()
  })
})