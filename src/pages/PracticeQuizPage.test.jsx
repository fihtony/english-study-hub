import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PracticeQuizPage from './PracticeQuizPage'

describe('PracticeQuizPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<PracticeQuizPage />)
    expect(container).toBeTruthy()
  })

  it('displays the question heading', () => {
    const { container } = render(<PracticeQuizPage />)
    // Use container.querySelector to get just one heading
    const heading = container.querySelector('h2')
    expect(heading).toBeTruthy()
    expect(heading.textContent).toContain('Which of the following sentences correctly utilizes')
  })

  it('renders all four options', () => {
    const { container } = render(<PracticeQuizPage />)
    const labels = container.querySelectorAll('label')
    expect(labels.length).toBe(4)
  })

  it('shows progress indicator', () => {
    const { container } = render(<PracticeQuizPage />)
    const progressSpans = container.querySelectorAll('.font-label-caps')
    // There should be at least 2 spans with question info (QUESTION X OF Y and percentage)
    expect(progressSpans.length).toBeGreaterThanOrEqual(2)
  })
})