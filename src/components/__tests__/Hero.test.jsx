import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders H1 headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: 'Master Academic English with Scholarly Precision.' })).toBeInTheDocument()
  })

  it('renders CTA button with correct text', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeInTheDocument()
  })

  it('CTA button is a button element', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'Start Learning Now' }).tagName).toBe('BUTTON')
  })

  it('renders all 3 category links as anchor elements', () => {
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

  it('category links have href="#" ', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#')
    })
  })
})