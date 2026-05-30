import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Landing Page', () => {
  it('renders the app without crashing', () => {
    render(<App />)
  })

  it('displays the site title in the navigation', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders the hero section with the main heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        name: /master academic english with scholarly precision/i,
      })
    ).toBeInTheDocument()
  })

  it('renders the call-to-action button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /start learning now/i }))
  })

  it('renders all three category links', () => {
    render(<App />)
    expect(screen.getByText(/advanced grammar/i)).toBeInTheDocument()
    expect(screen.getByText(/research writing/i)).toBeInTheDocument()
    expect(screen.getByText(/formal vocabulary/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /sign in/i }))
  })

  it('renders the footer with copyright', () => {
    render(<App />)
    expect(screen.getByText(/© \d{4} linguist library/i)).toBeInTheDocument()
  })

  it('renders footer navigation links', () => {
    render(<App />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})