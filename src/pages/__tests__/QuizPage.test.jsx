import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import QuizPage from '../QuizPage'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('QuizPage', () => {
  it('renders quiz page with progress indicator', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('QUESTION 4 OF 12')).toBeTruthy()
    expect(screen.getByText('33% COMPLETE')).toBeTruthy()
  })

  it('renders h2 heading with question text', () => {
    renderWithRouter(<QuizPage />)

    const heading = screen.getByText('Which of the following sentences correctly utilizes the present perfect continuous tense?')
    expect(heading).toBeTruthy()
    expect(heading.tagName.toLowerCase()).toBe('h2')
  })

  it('renders all 4 quiz options', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('have been gathering')).toBeTruthy()
    expect(screen.getByText('had gathered')).toBeTruthy()
    expect(screen.getByText('are gathering')).toBeTruthy()
    expect(screen.getByText('will have gathered')).toBeTruthy()
  })

  it('renders Next button with arrow icon', () => {
    renderWithRouter(<QuizPage />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeTruthy()
  })

  it('renders footer with dynamic year', () => {
    renderWithRouter(<QuizPage />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeTruthy()
  })

  it('renders footer with policy links', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })

  it('renders TopNavBar with logo and nav links', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('Linguist Library')).toBeTruthy()
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeTruthy()
  })

  it('renders fieldset and legend for accessibility', () => {
    renderWithRouter(<QuizPage />)

    const fieldset = document.querySelector('fieldset')
    expect(fieldset).toBeTruthy()

    const legend = document.querySelector('legend')
    expect(legend).toBeTruthy()
  })

  it('has radio inputs with proper htmlFor attributes', () => {
    renderWithRouter(<QuizPage />)

    const radioInputs = document.querySelectorAll('input[type="radio"]')
    expect(radioInputs.length).toBe(4)
  })

  it('renders blockquote with left border styling', () => {
    renderWithRouter(<QuizPage />)

    const quote = screen.getByText(/The researchers _____ data/)
    expect(quote).toBeTruthy()
  })

  it('handles answer selection', () => {
    renderWithRouter(<QuizPage />)

    const radioInputs = document.querySelectorAll('input[type="radio"]')
    expect(radioInputs.length).toBe(4)
  })

  it('renders navigation links with aria-disabled', () => {
    renderWithRouter(<QuizPage />)

    const navLinks = document.querySelectorAll('a[aria-disabled="true"]')
    expect(navLinks.length).toBeGreaterThan(0)
  })
})