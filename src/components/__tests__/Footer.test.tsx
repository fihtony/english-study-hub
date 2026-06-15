import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright with dynamic year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders all three policy links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('policy links have correct aria-labels', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByLabelText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact Support')).toBeInTheDocument()
  })

  it('renders footer nav with aria-label', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /Footer policy links/i })
    expect(nav).toBeInTheDocument()
  })

  it('policy links have correct href attributes', () => {
    render(<Footer />)
    expect(screen.getByLabelText('Terms of Service')).toHaveAttribute('href', '#terms')
    expect(screen.getByLabelText('Privacy Policy')).toHaveAttribute('href', '#privacy')
    expect(screen.getByLabelText('Contact Support')).toHaveAttribute('href', '#support')
  })

  it('renders Linguist Library text', () => {
    render(<Footer />)
    expect(screen.getByText(/Linguist Library/)).toBeInTheDocument()
  })
})