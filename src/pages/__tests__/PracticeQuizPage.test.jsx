import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PracticeQuizPage from '../PracticeQuizPage'

describe('PracticeQuizPage', () => {
  it('renders quiz page with question text', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByText(/Which of the following sentences correctly utilizes/i).length).toBeGreaterThan(0)
  })

  it('renders progress indicator with question number', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByText('QUESTION 4 OF 12').length).toBeGreaterThan(0)
    expect(screen.getAllByText('33% COMPLETE').length).toBeGreaterThan(0)
  })

  it('renders all 4 quiz options', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByText('have been gathering').length).toBeGreaterThan(0)
    expect(screen.getAllByText('had gathered').length).toBeGreaterThan(0)
    expect(screen.getAllByText('are gathering').length).toBeGreaterThan(0)
    expect(screen.getAllByText('will have gathered').length).toBeGreaterThan(0)
  })

  it('renders Next button', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByRole('button', { name: /next/i }).length).toBeGreaterThan(0)
  })

  it('renders navigation bar with logo and links', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lessons').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Flashcards').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Progress').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Library').length).toBeGreaterThan(0)
  })

  it('renders Sign In button', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByRole('button', { name: 'Sign In' }).length).toBeGreaterThan(0)
  })

  it('renders footer with dynamic year', () => {
    const currentYear = new Date().getFullYear()
    render(<PracticeQuizPage />)
    expect(screen.getAllByText(new RegExp(`${currentYear}`)).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact Support').length).toBeGreaterThan(0)
  })

  it('renders blockquote text', () => {
    render(<PracticeQuizPage />)
    expect(screen.getAllByText(/The researchers _____ data for over three decades/i).length).toBeGreaterThan(0)
  })

  it('has fieldset and legend for accessibility', () => {
    render(<PracticeQuizPage />)
    const legend = document.querySelector('legend')
    expect(legend).toBeTruthy()
  })

  it('renders radio inputs with proper name attribute', () => {
    render(<PracticeQuizPage />)
    const radioInputs = document.querySelectorAll('input[type="radio"][name="quiz_option"]')
    expect(radioInputs.length).toBeGreaterThan(0)
  })
})