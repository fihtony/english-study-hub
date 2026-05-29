import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© \d{4} Linguist Library/)).toBeInTheDocument()
  })

  it('renders policy links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('has footer element with navigation role', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })
})