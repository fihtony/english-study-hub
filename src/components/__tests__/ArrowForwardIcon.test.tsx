import { render } from '@testing-library/react'
import ArrowForwardIcon from '../ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders SVG element', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('has aria-hidden attribute', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('has correct viewBox attribute', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('renders path element with fill', () => {
    render(<ArrowForwardIcon />)
    const path = document.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('fill', 'currentColor')
  })
})