import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
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
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
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

  it('shows Library link as active when on /library', () => {
    render(
      <MemoryRouter initialEntries={['/library']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const libraryLink = screen.getByText('Library')
    expect(libraryLink).toHaveClass('text-secondary')
  })
})