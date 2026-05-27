import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getAllByText('Master Academic English with Scholarly Precision.').length).toBeGreaterThanOrEqual(1)
  })

  it('renders CTA button', () => {
    render(<Hero />)
    expect(screen.getAllByText('Start Learning Now').length).toBeGreaterThanOrEqual(1)
  })

  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getAllByText('Advanced Grammar').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Research Writing').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Formal Vocabulary').length).toBeGreaterThanOrEqual(1)
  })
})