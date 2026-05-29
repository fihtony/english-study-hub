import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ArrowForwardIcon from '../components/ArrowForwardIcon'

describe('ArrowForwardIcon', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('has aria-hidden attribute', () => {
    const { container } = render(<ArrowForwardIcon />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })
})