import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders Linguist Library logo', () => {
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

  it('uses text-primary for logo color', () => {
    render(<TopNavBar />)
    const logo = screen.getByText('Linguist Library')
    expect(logo.className).toContain('text-primary')
  })

  it('uses tertiary-container for Sign In button background', () => {
    render(<TopNavBar />)
    const button = screen.getByRole('button', { name: 'Sign In' })
    expect(button.className).toContain('bg-tertiary-container')
  })
})