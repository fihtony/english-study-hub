import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders all nav links', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Lessons')).toBeInTheDocument()
    expect(screen.getByLabelText('Flashcards')).toBeInTheDocument()
    expect(screen.getByLabelText('Progress')).toBeInTheDocument()
    expect(screen.getByLabelText('Library')).toBeInTheDocument()
  })

  it('shows active state for current route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const lessonsLink = screen.getByLabelText('Lessons')
    expect(lessonsLink).toHaveClass('text-secondary')
  })

  it('Sign In button is clickable', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: 'Sign In' })
    await user.click(button)
    expect(button).toBeInTheDocument()
  })
})