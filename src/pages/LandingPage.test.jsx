import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<LandingPage />)
    expect(container).toBeTruthy()
  })

  it('displays the main heading', () => {
    const { getByRole } = render(<LandingPage />)
    const heading = getByRole('heading', { level: 1 })
    expect(heading).toBeTruthy()
    expect(heading.textContent).toContain('Master Academic English')
  })

  it('renders the TopNavBar with brand name', () => {
    const { getByText } = render(<LandingPage />)
    expect(getByText('Linguist Library')).toBeTruthy()
  })

  it('renders navigation links', () => {
    const { getByText } = render(<LandingPage />)
    expect(getByText('Lessons')).toBeTruthy()
    expect(getByText('Flashcards')).toBeTruthy()
    expect(getByText('Progress')).toBeTruthy()
    expect(getByText('Library')).toBeTruthy()
  })

  it('renders the Sign In button', () => {
    const { getByRole } = render(<LandingPage />)
    const button = getByRole('button', { name: 'Sign In' })
    expect(button).toBeTruthy()
  })

  it('renders the Start Learning Now button', () => {
    const { getByRole } = render(<LandingPage />)
    const button = getByRole('button', { name: 'Start Learning Now' })
    expect(button).toBeTruthy()
  })

  it('renders the footer with copyright', () => {
    const { getByText } = render(<LandingPage />)
    expect(getByText(/© \d{4} Linguist Library/)).toBeTruthy()
  })
})