import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

describe('App routing', () => {
  it('redirects from / to /lessons', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Navigate to="/lessons" replace />} />
          <Route path="/lessons" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>
    )
    const location = document.querySelector('[data-testid="location"]')
    expect(location?.textContent).toBe('/lessons')
  })

  it('/lessons route renders LessonLibraryPage', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })
})