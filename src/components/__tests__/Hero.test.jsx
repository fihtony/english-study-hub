import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero.jsx'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
  })

  it('renders CTA button', () => {
    render(<Hero />)
    expect(screen.getByText('Start Learning Now')).toBeDefined()
  })

  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getByText('Advanced Grammar')).toBeDefined()
    expect(screen.getByText('Research Writing')).toBeDefined()
    expect(screen.getByText('Formal Vocabulary')).toBeDefined()
  })
})