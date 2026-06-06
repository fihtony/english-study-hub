import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders the brand name', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    render(<TopNavBar />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })

  it('renders all 4 navigation links', () => {
    render(<TopNavBar />)
    const navLinks = screen.getAllByRole('link')
    expect(navLinks).toHaveLength(4) // Lessons, Flashcards, Progress, Library
  })

  it('renders Lessons link', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeInTheDocument()
  })

  it('renders Flashcards link', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Flashcards' })).toBeInTheDocument()
  })

  it('renders Progress link', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Progress' })).toBeInTheDocument()
  })

  it('renders Library link', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument()
  })
})
