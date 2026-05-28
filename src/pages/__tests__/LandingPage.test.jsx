import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders the landing page with header, hero, and footer', () => {
    render(<LandingPage />)

    // Header elements
    expect(screen.getByText('Linguist Library')).toBeTruthy()
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeTruthy()

    // Hero elements
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
    expect(screen.getByText('Start Learning Now')).toBeTruthy()
    expect(screen.getByText('Advanced Grammar')).toBeTruthy()
    expect(screen.getByText('Research Writing')).toBeTruthy()
    expect(screen.getByText('Formal Vocabulary')).toBeTruthy()

    // Footer elements
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeTruthy()
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })
})