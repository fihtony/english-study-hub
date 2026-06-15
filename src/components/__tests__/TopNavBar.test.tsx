import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopNavBar from '../TopNavBar'
import { MemoryRouter } from 'react-router-dom'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
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
    const signInButton = screen.getByRole('button', { name: /Sign In/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('has aria-labels on navigation links', () => {
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

  it('highlights active link based on pathname', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    const lessonsLink = screen.getByLabelText('Lessons')
    expect(lessonsLink).toHaveClass('text-secondary')
  })

  it('calls Sign In button on click', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const signInButton = screen.getByRole('button', { name: /Sign In/i })
    await user.click(signInButton)
    expect(signInButton).toBeInTheDocument()
  })
})