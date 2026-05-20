import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../TopNavBar.jsx'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
  })

  it('renders nav links', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Lessons')).toBeDefined()
    expect(screen.getByText('Flashcards')).toBeDefined()
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('Library')).toBeDefined()
  })

  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Sign In')).toBeDefined()
  })
})