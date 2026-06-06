import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<Hero />)
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders all 3 category links', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renders Advanced Grammar link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Advanced Grammar/i })).toBeInTheDocument()
  })

  it('renders Research Writing link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Research Writing/i })).toBeInTheDocument()
  })

  it('renders Formal Vocabulary link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Formal Vocabulary/i })).toBeInTheDocument()
  })
})
