import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /Master Academic English with Scholarly Precision/i })).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )
    const ctaButton = screen.getByRole('button', { name: 'Start Learning Now' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton.tagName).toBe('BUTTON')
  })

  it('renders all category links', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /Advanced Grammar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Research Writing/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Formal Vocabulary/i })).toBeInTheDocument()
  })

  it('category links are anchor elements', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )
    const grammarLink = screen.getByRole('link', { name: /Advanced Grammar/i })
    const writingLink = screen.getByRole('link', { name: /Research Writing/i })
    const vocabLink = screen.getByRole('link', { name: /Formal Vocabulary/i })
    expect(grammarLink.tagName).toBe('A')
    expect(writingLink.tagName).toBe('A')
    expect(vocabLink.tagName).toBe('A')
  })

  it('category links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /Advanced Grammar/i })).toHaveAttribute('href', '/lessons?category=grammar')
    expect(screen.getByRole('link', { name: /Research Writing/i })).toHaveAttribute('href', '/lessons?category=writing')
    expect(screen.getByRole('link', { name: /Formal Vocabulary/i })).toHaveAttribute('href', '/lessons?category=vocabulary')
  })
})
