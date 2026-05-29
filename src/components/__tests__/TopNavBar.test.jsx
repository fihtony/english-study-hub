import { render, screen } from '@testing-library/react'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })
  it('renders nav links', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })
  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })
})