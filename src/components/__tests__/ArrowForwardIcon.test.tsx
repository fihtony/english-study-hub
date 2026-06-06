import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ArrowForwardIcon from '../ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders the SVG with correct attributes', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('role', 'img')
  })
})
