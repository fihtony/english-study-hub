import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ArrowForwardIcon } from './ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders the SVG element', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.tagName.toLowerCase()).toBe('svg')
  })

  it('has correct viewBox attribute', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('has fill set to none', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('fill', 'none')
  })

  it('renders with default className', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('inline-block', 'text-sm')
  })

  it('accepts custom className', () => {
    render(<ArrowForwardIcon className="custom-class" />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })

  it('contains the arrow path element', () => {
    render(<ArrowForwardIcon />)
    const path = document.querySelector('svg path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('fill', 'currentColor')
  })
})
