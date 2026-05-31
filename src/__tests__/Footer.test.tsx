import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '../components/Footer'

describe('Footer', () => {
  it('renders copyright text with dynamic year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument()
  })

  it('renders policy links with aria-labels', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByLabelText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact Support')).toBeInTheDocument()
  })

  it('renders all three policy links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('policy links have correct href values', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toHaveAttribute('href', '#')
    expect(screen.getByLabelText('Privacy Policy')).toHaveAttribute('href', '#')
    expect(screen.getByLabelText('Contact Support')).toHaveAttribute('href', '#')
  })
})
