import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArrowForwardIcon from '../ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders an SVG element', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('SVG has correct viewBox attribute', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24')
  })

  it('SVG contains a path element for the arrow', () => {
    render(<ArrowForwardIcon />)
    const path = document.querySelector('svg path')
    expect(path).toBeInTheDocument()
  })
})