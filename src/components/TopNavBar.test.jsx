import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from './TopNavBar'

describe('TopNavBar', () => {
  it('renders the brand name', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
  })

  it('renders navigation links', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Flashcards' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Progress' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Library' })).toBeTruthy()
  })

  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy()
  })

  it('has correct navigation aria-label', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeTruthy()
  })
})