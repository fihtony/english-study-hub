import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import PracticeQuizPage from '../PracticeQuizPage'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('PracticeQuizPage', () => {
  it('renders the quiz page with question text', () => {
    renderWithRouter(<PracticeQuizPage />)
    const questionText = screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous tense?/)
    expect(questionText).toBeInTheDocument()
  })

  it('renders the progress indicator with question number', () => {
    renderWithRouter(<PracticeQuizPage />)
    expect(screen.getByText('QUESTION 4 OF 12')).toBeInTheDocument()
  })

  it('renders the progress percentage', () => {
    renderWithRouter(<PracticeQuizPage />)
    expect(screen.getByText('33% COMPLETE')).toBeInTheDocument()
  })

  it('renders all four quiz options', () => {
    renderWithRouter(<PracticeQuizPage />)
    expect(screen.getByText('have been gathering')).toBeInTheDocument()
    expect(screen.getByText('had gathered')).toBeInTheDocument()
    expect(screen.getByText('are gathering')).toBeInTheDocument()
    expect(screen.getByText('will have gathered')).toBeInTheDocument()
  })

  it('renders the Next button', () => {
    renderWithRouter(<PracticeQuizPage />)
    const nextButton = screen.getByRole('button', { name: /Next/i })
    expect(nextButton).toBeInTheDocument()
  })

  it('renders the quote text', () => {
    renderWithRouter(<PracticeQuizPage />)
    expect(screen.getByText(/The researchers _____ data for over three decades/)).toBeInTheDocument()
  })
})
