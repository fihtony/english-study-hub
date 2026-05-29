import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../../components/TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<TopNavBar />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})