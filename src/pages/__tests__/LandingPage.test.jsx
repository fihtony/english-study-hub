import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the hero headline', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
  })

  it('renders the CTA button', () => {
    render(<LandingPage />)
    expect(screen.getByText('Start Learning Now')).toBeDefined()
  })

  it('renders the header with navigation', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
    expect(screen.getByText('Sign In')).toBeDefined()
  })

  it('renders the footer with copyright', () => {
    render(<LandingPage />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeDefined()
  })

  it('renders all three category links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeDefined()
    expect(screen.getByText('Research Writing')).toBeDefined()
    expect(screen.getByText('Formal Vocabulary')).toBeDefined()
  })
})