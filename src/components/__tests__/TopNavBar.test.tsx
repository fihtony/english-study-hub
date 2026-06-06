import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const buttons = screen.getAllByRole('button', { name: 'Sign In' })
    expect(buttons.length).toBe(1)
  })

  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Flashcards' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Progress' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Lessons' })).toHaveAttribute('href', '/lessons')
    expect(screen.getByRole('link', { name: 'Flashcards' })).toHaveAttribute('href', '/flashcards')
    expect(screen.getByRole('link', { name: 'Progress' })).toHaveAttribute('href', '/progress')
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('href', '/library')
  })

  it('has navigation landmark', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
