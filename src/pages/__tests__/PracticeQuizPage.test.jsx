import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import PracticeQuizPage from '../PracticeQuizPage'

describe('PracticeQuizPage', () => {
  beforeEach(() => {
    render(<PracticeQuizPage />)
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the quiz page with navigation bar', () => {
    expect(screen.getByText('Linguist Library')).toBeDefined()
    expect(screen.getByText('Lessons')).toBeDefined()
  })

  it('displays the first question', () => {
    expect(screen.getByText(/QUESTION 1 OF 12/i)).toBeDefined()
    expect(screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous tense?/i)).toBeDefined()
  })

  it('displays progress indicator', () => {
    expect(screen.getByText(/8% COMPLETE/i)).toBeDefined()
  })

  it('renders radio button options', () => {
    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons.length).toBe(4)
  })

  it('allows selecting an option', () => {
    const radioButtons = screen.getAllByRole('radio')
    fireEvent.click(radioButtons[0])
    expect(radioButtons[0].checked).toBe(true)
  })

  it('navigates to next question when Next is clicked', () => {
    const radioButtons = screen.getAllByRole('radio')
    fireEvent.click(radioButtons[0])
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    expect(screen.getByText(/QUESTION 2 OF 12/i)).toBeDefined()
  })

  it('shows completion screen on final question', () => {
    // Click through all 12 questions
    for (let i = 0; i < 12; i++) {
      const radioButtons = screen.getAllByRole('radio')
      fireEvent.click(radioButtons[0])
      const nextButton = screen.getByRole('button', { name: i < 11 ? /next/i : /finish/i })
      fireEvent.click(nextButton)
    }
    
    expect(screen.getByText(/Quiz Complete!/i)).toBeDefined()
  })

  it('displays footer', () => {
    expect(screen.getByText(/© 2024 Linguist Library/i)).toBeDefined()
  })
})
