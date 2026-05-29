import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LessonLibraryPage from '../pages/LessonLibraryPage'
import { MemoryRouter } from 'react-router-dom'

describe('LessonLibraryPage', () => {
  it('renders page title "Lesson Library"', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const headings = screen.getAllByRole('heading')
    expect(headings.find(h => h.textContent === 'Lesson Library')).toBeTruthy()
  })

  it('renders 5 lesson items', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links.length >= 5).toBeTruthy()
  })

  it('renders curriculum label', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const labels = screen.getAllByText('CURRICULUM')
    expect(labels[0]).toBeTruthy()
  })
})