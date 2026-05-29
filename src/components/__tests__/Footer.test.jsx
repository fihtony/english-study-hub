import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeInTheDocument()
  })
  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})