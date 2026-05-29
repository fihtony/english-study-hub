import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders headline text', () => {
    render(<Hero />)
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
  })
  it('renders CTA button', () => {
    render(<Hero />)
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
  })
  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
  })
})