import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'

const renderWithRouter = (ui: React.ReactElement, initialEntry = '/') => {
  return render(ui, { wrapper: ({ children }) => <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter> })
}

describe('TopNavBar', () => {
  it('renders logo with aria-label', () => {
    renderWithRouter(<TopNavBar />)
    const logo = screen.getByLabelText('Linguist Library Home')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveTextContent('Linguist Library')
  })

  it('renders navigation links with aria-labels', () => {
    renderWithRouter(<TopNavBar />)
    expect(screen.getByLabelText('Navigate to Lessons page')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Flashcards page')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Progress page')).toBeInTheDocument()
    expect(screen.getByLabelText('Navigate to Library page')).toBeInTheDocument()
  })

  it('renders Sign In button with aria-label', () => {
    renderWithRouter(<TopNavBar />)
    const signInButton = screen.getByLabelText('Sign In')
    expect(signInButton).toBeInTheDocument()
    expect(signInButton).toHaveTextContent('Sign In')
  })

  it('highlights Lessons link when on /lessons route', () => {
    renderWithRouter(<TopNavBar />, '/lessons')
    const lessonsLink = screen.getByLabelText('Navigate to Lessons page')
    expect(lessonsLink).toHaveClass('text-secondary')
  })

  it('has navigation landmark role', () => {
    renderWithRouter(<TopNavBar />)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
  })
})