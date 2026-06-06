import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArrowForwardIcon from './ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders an SVG element', () => {
    render(<ArrowForwardIcon />)
    expect(document.querySelector('svg')).toBeTruthy()
  })

  it('has correct aria-hidden attribute', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })
})