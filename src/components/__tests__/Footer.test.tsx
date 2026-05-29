import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Linguist Library. Premium Academic English Study.`)).toBeInTheDocument()
  })

  it('renders Terms of Service link', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('renders Privacy Policy link', () => {
    render(<Footer />)
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })

  it('renders Contact Support link', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('does not have a top border (no border-t class)', () => {
    render(<Footer />)
    const footer = document.querySelector('footer')
    expect(footer?.className).not.toContain('border-t')
  })
})