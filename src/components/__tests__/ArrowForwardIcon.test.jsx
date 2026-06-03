import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('ArrowForwardIcon (via Hero)', () => {
  it('renders arrow icons next to category links', () => {
    render(<Hero />)
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(3)
  })

  it('arrow icons have correct structure (path element)', () => {
    render(<Hero />)
    const paths = document.querySelectorAll('svg path')
    expect(paths.length).toBeGreaterThanOrEqual(3)
  })
})