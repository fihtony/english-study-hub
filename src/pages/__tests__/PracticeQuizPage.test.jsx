import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PracticeQuizPage from '../PracticeQuizPage'

describe('PracticeQuizPage', () => {
  it('renders quiz question and options', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(getByText(/QUESTION 4 OF 12/)).toBeTruthy()
    expect(getByText(/present perfect continuous/)).toBeTruthy()
    expect(getByText('have been gathering')).toBeTruthy()
    expect(getByText('had gathered')).toBeTruthy()
  })

  it('renders navigation with Linguist Library title', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(getAllByText('Linguist Library').length).toBeGreaterThan(0)
    expect(getAllByText('Sign In').length).toBeGreaterThan(0)
  })

  it('renders footer with copyright', () => {
    const currentYear = new Date().getFullYear()
    const { getAllByText } = render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    expect(getAllByText(new RegExp(`© ${currentYear}`)).length).toBeGreaterThan(0)
  })

  it('renders progress bar', () => {
    const { container } = render(
      <BrowserRouter>
        <PracticeQuizPage />
      </BrowserRouter>
    )

    const progressBar = container.querySelector('.bg-secondary')
    expect(progressBar).toBeTruthy()
  })
})