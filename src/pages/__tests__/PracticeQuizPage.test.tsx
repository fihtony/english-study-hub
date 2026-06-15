import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PracticeQuizPage from '../PracticeQuizPage'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('PracticeQuizPage', () => {
  it('renders the quiz question', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous tense?/i)).toBeDefined()
  })

  it('renders the fill-in-the-blank sentence', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText(/The researchers _____ data for over three decades/i)).toBeDefined()
  })

  it('renders all four answer options', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText('have been gathering')).toBeDefined()
    expect(screen.getByText('had gathered')).toBeDefined()
    expect(screen.getByText('are gathering')).toBeDefined()
    expect(screen.getByText('will have gathered')).toBeDefined()
  })

  it('renders the progress indicator', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText('QUESTION 4 OF 12')).toBeDefined()
    expect(screen.getByText('33% COMPLETE')).toBeDefined()
  })

  it('renders the Next button', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByRole('button', { name: /next/i })).toBeDefined()
  })

  it('renders the navigation bar', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText('Linguist Library')).toBeDefined()
    expect(screen.getByText('Lessons')).toBeDefined()
    expect(screen.getByText('Flashcards')).toBeDefined()
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('Library')).toBeDefined()
    expect(screen.getByText('Sign In')).toBeDefined()
  })

  it('renders the footer', () => {
    renderWithRouter(<PracticeQuizPage />)
    
    expect(screen.getByText(/© 2024 Linguist Library/i)).toBeDefined()
    expect(screen.getByText('Terms of Service')).toBeDefined()
    expect(screen.getByText('Privacy Policy')).toBeDefined()
    expect(screen.getByText('Contact Support')).toBeDefined()
  })
})
