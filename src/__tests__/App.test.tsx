import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Routing', () => {
  it('redirects from root to /lessons', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders LessonLibraryPage at /lessons route', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders navigation bar on lessons page', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('renders footer copyright on lessons page', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })
})