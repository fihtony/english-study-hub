import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../../pages/LandingPage'

describe('LandingPage', () => {
  it('renders the page title', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThan(0)
  })

  it('renders the hero headline', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Master Academic English with Scholarly Precision.').length).toBeGreaterThan(0)
  })

  it('renders the CTA button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Start Learning Now').length).toBeGreaterThan(0)
  })

  it('renders all three category links', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Advanced Grammar').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Research Writing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Formal Vocabulary').length).toBeGreaterThan(0)
  })

  it('renders the footer copyright', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('© 2024 Linguist Library. Premium Academic English Study.').length).toBeGreaterThan(0)
  })

  it('renders Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0)
  })
})