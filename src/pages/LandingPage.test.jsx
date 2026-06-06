import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the TopNavBar', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
  })

  it('renders the Hero section', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
  })

  it('renders the Footer', () => {
    render(<LandingPage />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library | Premium Academic English Study.`)).toBeTruthy()
  })
})