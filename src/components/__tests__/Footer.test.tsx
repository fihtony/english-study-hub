import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const copyright = screen.getAllByText(new RegExp(`©.*${currentYear}`))
    expect(copyright.length).toBeGreaterThan(0)
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact Support').length).toBeGreaterThan(0)
  })

  it('footer links are anchor elements', () => {
    render(<Footer />)
    const links = document.querySelectorAll('footer a')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })
})
