import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders all 4 nav links', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Flashcards' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Progress' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument()
  })

  it('nav links have correct href attributes', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('link', { name: 'Lessons' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Flashcards' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Progress' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('href', '#')
  })

  it('renders Sign In as a button', () => {
    render(<TopNavBar />)
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })
})