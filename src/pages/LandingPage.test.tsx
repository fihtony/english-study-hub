/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the hero heading', () => {
    render(<LandingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the navigation bar with brand name', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Linguist Library')[0]).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<LandingPage />)
    const navLinks = screen.getAllByText('Lessons')
    expect(navLinks.length).toBeGreaterThan(0)
  })

  it('renders the Sign In button', () => {
    render(<LandingPage />)
    const buttons = screen.getAllByRole('button', { name: 'Sign In' })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders the Start Learning Now button', () => {
    render(<LandingPage />)
    const buttons = screen.getAllByRole('button', { name: 'Start Learning Now' })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders the footer', () => {
    render(<LandingPage />)
    const footer = document.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})