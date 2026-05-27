import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo and navigation', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeTruthy()
    expect(screen.getByText('Lessons')).toBeTruthy()
    expect(screen.getByText('Flashcards')).toBeTruthy()
    expect(screen.getByText('Progress')).toBeTruthy()
    expect(screen.getByText('Library')).toBeTruthy()
    expect(screen.getByText('Sign In')).toBeTruthy()
  })
})