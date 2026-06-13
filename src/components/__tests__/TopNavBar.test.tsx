import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
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

  it('renders navigation links with aria-labels', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Lessons')).toBeInTheDocument()
    expect(screen.getByLabelText('Flashcards')).toBeInTheDocument()
    expect(screen.getByLabelText('Progress')).toBeInTheDocument()
    expect(screen.getByLabelText('Library')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
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
})