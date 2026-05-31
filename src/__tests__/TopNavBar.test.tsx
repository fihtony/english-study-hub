import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { TopNavBar } from '../components/TopNavBar'

describe('TopNavBar', () => {
  it('renders the logo text', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders navigation links with aria-labels', () => {
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

  it('renders Sign In button with aria-label', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const signInButton = screen.getByLabelText('Sign In')
    expect(signInButton).toBeInTheDocument()
    expect(signInButton).toHaveTextContent('Sign In')
  })

  it('highlights Lessons link when at /lessons route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const lessonsLink = screen.getByLabelText('Lessons')
    expect(lessonsLink).toHaveAttribute('aria-current', 'page')
  })

  it('Sign In button is clickable', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const signInButton = screen.getByLabelText('Sign In')
    await user.click(signInButton)
    expect(signInButton).toBeInTheDocument()
  })

  it('does not highlight Lessons link when at different route', () => {
    render(
      <MemoryRouter initialEntries={['/flashcards']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const lessonsLink = screen.getByLabelText('Lessons')
    expect(lessonsLink).not.toHaveAttribute('aria-current', 'page')
  })
})
