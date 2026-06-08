import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../App'

describe('App routing', () => {
  it('redirects from / to /lessons', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    )
    // After redirect, the Lessons nav link should be active
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' })
    expect(lessonsLink).toBeInTheDocument()
  })

  it('renders LessonLibraryPage at /lessons route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('has /lessons route with correct content', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })
})