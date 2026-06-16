import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText(/Master Academic English/i)).toBeDefined()
  })

  it('renders the header with logo', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
  })

  it('renders the start learning button', () => {
    render(<App />)
    expect(screen.getByText('Start Learning Now')).toBeDefined()
  })

  it('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText('Lessons')).toBeDefined()
    expect(screen.getByText('Flashcards')).toBeDefined()
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('Library')).toBeDefined()
  })

  it('renders the footer', () => {
    render(<App />)
    expect(screen.getByText(/© 2024 Linguist Library/i)).toBeDefined()
  })
})
