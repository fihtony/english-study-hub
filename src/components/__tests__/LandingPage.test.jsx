import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../TopNavBar'
import Hero from '../Hero'
import Footer from '../Footer'
import LandingPage from '../../pages/LandingPage'

describe('TopNavBar', () => {
  it('renders logo', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })
  it('renders nav links', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Lessons')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Library')).toBeInTheDocument()
  })
  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })
})

describe('Hero', () => {
  it('renders headline', () => {
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

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
  })
  it('renders links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})

describe('LandingPage', () => {
  it('renders all sections', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
    expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
  })
})