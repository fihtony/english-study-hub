import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, test, expect } from 'vitest'
import LandingPage from '../LandingPage'

afterEach(cleanup)

describe('LandingPage', () => {
  test('renders TopNavBar with logo text', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
  })

  test('renders TopNavBar with Sign In button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Sign In').length).toBe(1)
  })

  test('renders nav links in TopNavBar', () => {
    render(<LandingPage />)
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
  })

  test('renders Hero with headline', () => {
    render(<LandingPage />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
  })

  test('renders Hero with CTA button', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('Start Learning Now').length).toBe(1)
  })

  test('renders category links in Hero', () => {
    render(<LandingPage />)
    expect(screen.getByText('Advanced Grammar')).toBeTruthy()
    expect(screen.getByText('Research Writing')).toBeTruthy()
    expect(screen.getByText('Formal Vocabulary')).toBeTruthy()
  })

  test('renders Footer with copyright', () => {
    render(<LandingPage />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeTruthy()
  })

  test('renders Footer with policy links', () => {
    render(<LandingPage />)
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })
})