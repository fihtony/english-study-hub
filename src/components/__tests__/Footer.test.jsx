import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer.jsx'

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeDefined()
  })

  it('renders links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeDefined()
    expect(screen.getByText('Privacy Policy')).toBeDefined()
    expect(screen.getByText('Contact Support')).toBeDefined()
  })
})