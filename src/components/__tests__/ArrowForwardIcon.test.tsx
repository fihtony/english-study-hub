import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ArrowForwardIcon from '../ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has aria-hidden attribute for accessibility', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders with correct viewBox', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('renders with correct dimensions', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })
})