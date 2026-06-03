import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} Linguist Library`))).toBeInTheDocument()
  })

  it('renders all 3 footer links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact Support' })).toBeInTheDocument()
  })

  it('footer links have href="#" ', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Contact Support' })).toHaveAttribute('href', '#')
  })
})