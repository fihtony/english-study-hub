import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the hero headline', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
  })

  it('renders the CTA button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Start Learning Now')[0]).toBeTruthy()
  })

  it('renders category links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Advanced Grammar')[0]).toBeTruthy()
    expect(screen.getAllByText('Research Writing')[0]).toBeTruthy()
    expect(screen.getAllByText('Formal Vocabulary')[0]).toBeTruthy()
  })

  it('renders header with logo and navigation', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Linguist Library')[0]).toBeTruthy()
    expect(screen.getAllByText('Sign In')[0]).toBeTruthy()
  })

  it('renders footer with copyright', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('© 2024 Linguist Library. Premium Academic English Study.')[0]).toBeTruthy()
  })
})