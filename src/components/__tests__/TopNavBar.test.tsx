import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(
      <MemoryRouter>
        <TopNavBar logoText="Test Logo" />
      </MemoryRouter>
    )
    expect(screen.getByText('Test Logo')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders Sign In button', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('marks active nav link based on current route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' })
    expect(lessonsLink).toHaveAttribute('aria-current', 'page')
  })

  it('has aria-labels on navigation links', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
  })
})