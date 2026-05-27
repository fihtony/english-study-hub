import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright and links', () => {
    render(<Footer />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeTruthy()
    expect(screen.getByText('Terms of Service')).toBeTruthy()
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
    expect(screen.getByText('Contact Support')).toBeTruthy()
  })
})