import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TopNavBar from '../TopNavBar'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(<TopNavBar />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<TopNavBar />)
    expect(screen.getAllByText('Lessons').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Flashcards').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Progress').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Library').length).toBeGreaterThan(0)
  })

  it('renders Sign In button', () => {
    render(<TopNavBar />)
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0)
  })

  it('has navigation links as anchor elements', () => {
    render(<TopNavBar />)
    const links = document.querySelectorAll('nav a')
    expect(links.length).toBeGreaterThanOrEqual(4)
  })
})
