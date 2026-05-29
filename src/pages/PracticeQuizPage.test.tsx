import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PracticeQuizPage from './PracticeQuizPage'

describe('PracticeQuizPage', () => {
  it('renders the quiz question', () => {
    render(<PracticeQuizPage />)
    expect(screen.getByText(/Which of the following sentences correctly utilizes the present perfect continuous/)).toBeDefined()
  })

  it('renders all four options', () => {
    render(<PracticeQuizPage />)
    expect(screen.getByText('have been gathering')).toBeDefined()
    expect(screen.getByText('had gathered')).toBeDefined()
    expect(screen.getByText('are gathering')).toBeDefined()
    expect(screen.getByText('will have gathered')).toBeDefined()
  })

  it('displays progress indicator with correct percentage', () => {
    render(<PracticeQuizPage />)
    expect(screen.getByText('33% COMPLETE')).toBeDefined()
    expect(screen.getByText('QUESTION 4 OF 12')).toBeDefined()
  })

  it('allows selecting an option', () => {
    render(<PracticeQuizPage />)
    const radioA = document.querySelector('input[value="a"]') as HTMLInputElement
    fireEvent.click(radioA)
    expect(radioA.checked).toBe(true)
  })
})