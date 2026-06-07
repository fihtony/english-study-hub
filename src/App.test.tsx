import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

const renderWithRouter = (initialEntry = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>
  )
}

describe('App routing', () => {
  it('redirects from / to /lessons and renders LessonLibraryPage', () => {
    renderWithRouter('/')
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders LessonLibraryPage at /lessons route', () => {
    renderWithRouter('/lessons')
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('displays curriculum label on lessons page', () => {
    renderWithRouter('/lessons')
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })
})