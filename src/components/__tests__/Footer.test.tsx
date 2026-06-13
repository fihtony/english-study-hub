import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders policy links with aria-labels', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByLabelText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact Support')).toBeInTheDocument()
  })

  it('renders all policy links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('renders company name', () => {
    render(<Footer />)
    expect(screen.getByText(/Linguist Library/)).toBeInTheDocument()
  })
})