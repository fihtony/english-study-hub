import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders three policy links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('policy links have correct href values', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/terms')
    expect(links[1]).toHaveAttribute('href', '/privacy')
    expect(links[2]).toHaveAttribute('href', '/contact')
  })

  it('has footer navigation aria-label', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const nav = screen.getByLabelText('Footer navigation')
    expect(nav).toBeInTheDocument()
  })
})