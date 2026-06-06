import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Linguist Library \\| Premium Academic English Study\\.`))).toBeInTheDocument()
  })

  it('renders Terms of Service link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument()
  })

  it('renders Privacy Policy link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
  })

  it('renders Contact Support link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Contact Support' })).toBeInTheDocument()
  })

  it('renders all 3 footer links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })
})
