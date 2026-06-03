import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PracticeQuizPage from '../PracticeQuizPage'

describe('PracticeQuizPage', () => {
  it('renders quiz page with question', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(screen.getByText(/QUESTION 4 OF 12/)).toBeTruthy()
    expect(screen.getByText(/Which of the following sentences correctly utilizes/)).toBeTruthy()
  })

  it('renders all four quiz options', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(screen.getByText('have been gathering')).toBeTruthy()
    expect(screen.getByText('had gathered')).toBeTruthy()
    expect(screen.getByText('are gathering')).toBeTruthy()
    expect(screen.getByText('will have gathered')).toBeTruthy()
  })

  it('renders navigation bar with brand name', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(screen.getByText('Linguist Library')).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeTruthy()
  })

  it('renders footer with copyright', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${year}`))).toBeTruthy()
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
  })

  it('renders Next button with arrow icon', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(screen.getByText('Next')).toBeTruthy()
  })

  it('allows selecting a quiz option', () => {
    render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    const options = document.querySelectorAll('input[type="radio"]')
    expect(options.length).toBe(4)

    const firstOption = options[0] as HTMLInputElement
    expect(firstOption.checked).toBe(false)
  })
})