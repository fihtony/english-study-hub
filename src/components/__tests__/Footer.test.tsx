import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the copyright text with current year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`©.*${currentYear}.*Linguist Library.*Premium Academic English Study`))).toBeInTheDocument()
  })

  it('renders Terms of Service link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const termsLink = screen.getByRole('link', { name: 'Terms of Service' })
    expect(termsLink).toBeInTheDocument()
    expect(termsLink.tagName).toBe('A')
    expect(termsLink).toHaveAttribute('href', '/terms')
  })

  it('renders Privacy Policy link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink.tagName).toBe('A')
    expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  it('renders Contact Support link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const contactLink = screen.getByRole('link', { name: 'Contact Support' })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink.tagName).toBe('A')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })
})
