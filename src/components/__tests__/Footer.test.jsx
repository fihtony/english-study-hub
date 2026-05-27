import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeDefined()
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3)
  })
})