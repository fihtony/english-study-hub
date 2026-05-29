import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LessonLibraryPage from '../LessonLibraryPage'

describe('LessonLibraryPage', () => {
  it('renders CURRICULUM label', () => {
    render(<LessonLibraryPage />)
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders Lesson Library heading', () => {
    render(<LessonLibraryPage />)
    expect(screen.getByRole('heading', { name: 'Lesson Library' })).toBeInTheDocument()
  })

  it('renders all 5 lesson cards', () => {
    render(<LessonLibraryPage />)
    const lessons = screen.getAllByText(/^UNIT/)
    expect(lessons).toHaveLength(5)
  })

  it('renders the first lesson correctly', () => {
    render(<LessonLibraryPage />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders the last lesson correctly', () => {
    render(<LessonLibraryPage />)
    expect(screen.getByText('Scientific Methodology and Report Composition')).toBeInTheDocument()
  })

  it('renders TopNavBar and Footer', () => {
    render(<LessonLibraryPage />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })
})