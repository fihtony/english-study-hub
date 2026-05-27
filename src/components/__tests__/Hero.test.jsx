import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders headline and CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
    expect(screen.getByText('Start Learning Now')).toBeTruthy()
  })

  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getByText('Advanced Grammar')).toBeTruthy()
    expect(screen.getByText('Research Writing')).toBeTruthy()
    expect(screen.getByText('Formal Vocabulary')).toBeTruthy()
  })
})