import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../../src/App'

describe('App Routing', () => {
  it('renders LessonLibraryPage at /lessons route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('displays 5 lesson items', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    // All buttons on page: 5 lesson cards + 1 Sign In = 6
    const allButtons = screen.getAllByRole('button')
    expect(allButtons).toHaveLength(6)
  })

  it('has Sign In button', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('redirects from / to /lessons', async () => {
    render(
      <BrowserRouter initialEntries={['/']}>
        <App />
      </BrowserRouter>
    )
    // After redirect, /lessons should be active
    expect(window.location.pathname).toBe('/lessons')
  })
})