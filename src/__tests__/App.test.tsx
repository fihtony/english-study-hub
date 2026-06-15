import { render, screen, cleanup } from '@testing-library/react'
import App from '../App'
import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

describe('App', () => {
  it('renders LessonLibraryPage at /lessons route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lesson Library')
  })

  it('renders navigation at /lessons route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByLabelText('Lessons')).toBeInTheDocument()
    expect(screen.getByLabelText('Flashcards')).toBeInTheDocument()
    expect(screen.getByLabelText('Progress')).toBeInTheDocument()
    expect(screen.getByLabelText('Library')).toBeInTheDocument()
  })

  it('renders CURRICULUM label at /lessons route', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('has correct route structure with Navigate redirect', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // App should redirect / to /lessons, so LessonLibraryPage content should be visible
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })
})