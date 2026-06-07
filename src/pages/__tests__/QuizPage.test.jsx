import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import QuizPage from '../QuizPage'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('QuizPage', () => {
  it('renders quiz page with progress indicator', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('QUESTION 4 OF 12')).toBeTruthy()
    expect(screen.getByText('33% COMPLETE')).toBeTruthy()
  })

  it('renders quiz question and quote', () => {
    renderWithRouter(<QuizPage />)

    expect(screen.getByText('Which of the following sentences correctly utilizes the present perfect continuous tense?')).toBeTruthy()
    expect(screen.getByText(/The researchers _____ data for over three decades/)).toBeTruthy()
  })

  it('renders all four quiz options', () => {
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
    expect(nextButton.querySelector('svg')).toBeTruthy()
  })

  it('allows selecting an answer', () => {
    renderWithRouter(<QuizPage />)

    const firstOption = screen.getByLabelText('have been gathering')
    fireEvent.click(firstOption)
    expect(firstOption.checked).toBe(true)
  })
})

describe('TopNavBar', () => {
  it('renders logo text', () => {
    renderWithRouter(<QuizPage />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
  })

  it('renders navigation links', () => {
    renderWithRouter(<QuizPage />)
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
  })

  it('renders Sign In button', () => {
    renderWithRouter(<QuizPage />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy()
  })
})

describe('Footer', () => {
  it('renders copyright with dynamic year', () => {
    renderWithRouter(<QuizPage />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeTruthy()
  })

  it('renders policy links', () => {
    renderWithRouter(<QuizPage />)
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })
})