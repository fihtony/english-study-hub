import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import App from './App'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('renders the app with Header, Hero, and Footer', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeDefined()
    expect(screen.getByText(/©.*Linguist Library/)).toBeDefined()
  })
})

describe('Header', () => {
  it('renders the site title', () => {
    render(<Header />)
    expect(screen.getByText('Linguist Library')).toBeDefined()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Lessons')).toBeDefined()
    expect(screen.getByText('Flashcards')).toBeDefined()
    expect(screen.getByText('Progress')).toBeDefined()
    expect(screen.getByText('Library')).toBeDefined()
  })

  it('renders Sign In button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDefined()
  })
})

describe('Hero', () => {
  it('renders the headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: 'Master Academic English with Scholarly Precision.' })).toBeDefined()
  })

  it('renders the CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'Start Learning Now' })).toBeDefined()
  })

  it('renders category links', () => {
    render(<Hero />)
    expect(screen.getByText('Advanced Grammar')).toBeDefined()
    expect(screen.getByText('Research Writing')).toBeDefined()
    expect(screen.getByText('Formal Vocabulary')).toBeDefined()
  })
})

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(`©.*${new Date().getFullYear()}.*Linguist Library`))).toBeDefined()
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByText('Terms of Service')).toBeDefined()
    expect(screen.getByText('Privacy Policy')).toBeDefined()
    expect(screen.getByText('Contact Support')).toBeDefined()
  })
})
