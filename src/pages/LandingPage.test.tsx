import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the application root with correct testid', () => {
    render(<LandingPage />)
    expect(screen.getByTestId('app-root')).toBeInTheDocument()
  })

  describe('Header', () => {
    it('renders the logo text', () => {
      render(<LandingPage />)
      expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    })

    it('renders navigation links', () => {
      render(<LandingPage />)
      expect(screen.getByText('Lessons')).toBeInTheDocument()
      expect(screen.getByText('Flashcards')).toBeInTheDocument()
      expect(screen.getByText('Progress')).toBeInTheDocument()
      expect(screen.getByText('Library')).toBeInTheDocument()
    })

    it('renders sign in button', () => {
      render(<LandingPage />)
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
    })
  })

  describe('Main Content', () => {
    it('renders the headline', () => {
      render(<LandingPage />)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Master Academic English with Scholarly Precision.'
      )
    })

    it('renders the primary CTA button', () => {
      render(<LandingPage />)
      const button = screen.getByRole('button', { name: 'Start Learning Now' })
      expect(button).toBeInTheDocument()
    })

    it('renders category links', () => {
      render(<LandingPage />)
      expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
      expect(screen.getByText('Research Writing')).toBeInTheDocument()
      expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
    })

    it('renders all category links as anchor elements', () => {
      render(<LandingPage />)
      const links = screen.getAllByRole('link')
      const categoryLinks = links.filter(
        (link) =>
          link.textContent?.includes('Grammar') ||
          link.textContent?.includes('Writing') ||
          link.textContent?.includes('Vocabulary')
      )
      expect(categoryLinks).toHaveLength(3)
    })
  })

  describe('Footer', () => {
    it('renders footer copyright text', () => {
      render(<LandingPage />)
      expect(screen.getByText(/© 2024 Linguist Library/)).toBeInTheDocument()
    })

    it('renders footer navigation links', () => {
      render(<LandingPage />)
      expect(screen.getByText('Terms of Service')).toBeInTheDocument()
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Contact Support')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<LandingPage />)
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      expect(headings[0]).toHaveProperty('tagName', 'H1')
    })

    it('buttons have accessible names', () => {
      render(<LandingPage />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName()
      })
    })

    it('links have accessible text', () => {
      render(<LandingPage />)
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link.textContent).toBeTruthy()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('can focus on the CTA button', () => {
      render(<LandingPage />)
      const button = screen.getByRole('button', { name: 'Start Learning Now' })
      button.focus()
      expect(button).toHaveFocus()
    })

    it('can focus on navigation links', () => {
      render(<LandingPage />)
      const link = screen.getByRole('link', { name: /Lessons/ })
      link.focus()
      expect(link).toHaveFocus()
    })

    it('can focus on sign in button', () => {
      render(<LandingPage />)
      const button = screen.getByRole('button', { name: 'Sign In' })
      button.focus()
      expect(button).toHaveFocus()
    })
  })
})
