import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PracticeQuizPage from '../PracticeQuizPage'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('PracticeQuizPage', () => {
  it('renders the quiz page with question and options', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText(/QUESTION 4 OF 12/i)).toBeTruthy()
    expect(screen.getByText(/33% COMPLETE/i)).toBeTruthy()
    expect(screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous tense?/i)).toBeTruthy()
  })

  it('displays all four quiz options', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const options = screen.getAllByText('have been gathering')
    expect(options.length).toBeGreaterThan(0)
  })

  it('allows selecting a radio option', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const radioOptions = screen.getAllByRole('radio')
    expect(radioOptions.length).toBeGreaterThanOrEqual(4)
    
    fireEvent.click(radioOptions[1])
    expect(radioOptions[1].checked).toBe(true)
  })

  it('renders the Next button', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const nextButtons = screen.getAllByRole('button', { name: /next/i })
    expect(nextButtons.length).toBeGreaterThan(0)
  })

  it('renders the Navbar with logo and nav links', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lessons').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0)
  })

  it('renders the Footer with copyright', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getAllByText(new RegExp(`© ${currentYear}`)).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
  })

  it('has a progress bar with correct structure', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const progressBars = screen.getAllByRole('progressbar')
    expect(progressBars.length).toBeGreaterThan(0)
  })

  it('displays the quote in a styled block', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    const quotes = screen.getAllByText(/The researchers _____ data/i)
    expect(quotes.length).toBeGreaterThan(0)
  })
})