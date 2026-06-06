import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library | Premium Academic English Study.`)).toBeTruthy()
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Contact Support' })).toBeTruthy()
  })
})