import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders main headline', () => {
    render(<Hero />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
  })

  it('renders CTA button', () => {
    render(<Hero />)
    expect(screen.getAllByText('Start Learning Now').length).toBeGreaterThan(0)
  })

  it('CTA is a button element', () => {
    render(<Hero />)
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getAllByText('Advanced Grammar').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Research Writing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Formal Vocabulary').length).toBeGreaterThan(0)
  })

  it('category links are anchor elements', () => {
    render(<Hero />)
    const links = document.querySelectorAll('main a')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })
})
