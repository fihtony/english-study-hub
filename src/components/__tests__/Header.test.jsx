import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders logo text', () => {
    render(<Header />)
    expect(screen.getAllByText('Linguist Library').length).toBeGreaterThanOrEqual(1)
  })

  it('renders nav links', () => {
    render(<Header />)
    expect(screen.getAllByText('Lessons').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Flashcards').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Progress').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Library').length).toBeGreaterThanOrEqual(1)
  })

  it('renders Sign In button', () => {
    render(<Header />)
    expect(screen.getAllByText('Sign In').length).toBeGreaterThanOrEqual(1)
  })
})