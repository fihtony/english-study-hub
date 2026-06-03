import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../TopNavBar'

test('renders navigation with brand name', () => {
  render(
    <MemoryRouter>
      <TopNavBar />
    </MemoryRouter>
  )

  expect(screen.getByText('Linguist Library')).toBeInTheDocument()
})

test('renders all nav links', () => {
  render(
    <MemoryRouter>
      <TopNavBar />
    </MemoryRouter>
  )

  expect(screen.getByText('Lessons')).toBeInTheDocument()
  expect(screen.getByText('Flashcards')).toBeInTheDocument()
  expect(screen.getByText('Progress')).toBeInTheDocument()
  expect(screen.getByText('Library')).toBeInTheDocument()
})

test('renders Sign In button', () => {
  render(
    <MemoryRouter>
      <TopNavBar />
    </MemoryRouter>
  )

  expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
})

test('highlights active nav link at /lessons route', () => {
  render(
    <MemoryRouter initialEntries={['/lessons']}>
      <TopNavBar />
    </MemoryRouter>
  )

  const lessonsLink = screen.getByLabelText('Lessons')
  expect(lessonsLink).toHaveClass('text-secondary')
})

test('highlights Library nav link when at /library route', () => {
  render(
    <MemoryRouter initialEntries={['/library']}>
      <TopNavBar />
    </MemoryRouter>
  )

  const libraryLink = screen.getByLabelText('Library')
  expect(libraryLink).toHaveClass('text-secondary')
})
