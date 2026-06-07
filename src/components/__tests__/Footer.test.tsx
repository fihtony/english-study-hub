import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('Footer', () => {
  it('renders copyright with current year', () => {
    renderWithRouter(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument()
  })

  it('renders policy links with aria-labels', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByLabelText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact Support')).toBeInTheDocument()
  })

  it('policy links have proper href attributes', () => {
    renderWithRouter(<Footer />)
    const termsLink = screen.getByLabelText('Terms of Service')
    const privacyLink = screen.getByLabelText('Privacy Policy')
    const contactLink = screen.getByLabelText('Contact Support')
    expect(termsLink).toHaveAttribute('href', '/terms')
    expect(privacyLink).toHaveAttribute('href', '/privacy')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('has navigation landmark role for footer nav', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
  })
})