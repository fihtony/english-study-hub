import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('App', () => {
  it('redirects from / to /lessons', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Use waitFor to handle the redirect
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
  })

  it('renders /lessons route correctly', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
  })

  it('renders TopNavBar with Sign In button', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Sign In')).toBeInTheDocument()
  })

  it('renders Footer with copyright', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument()
  })
})
