import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeTruthy()
    expect(screen.getByText(/Linguist Library/)).toBeTruthy()
  })

  it('renders policy links', () => {
    render(<Footer />)
    expect(screen.getAllByText('Terms of Service')[0]).toBeTruthy()
    expect(screen.getAllByText('Privacy Policy')[0]).toBeTruthy()
    expect(screen.getAllByText('Contact Support')[0]).toBeTruthy()
  })
})