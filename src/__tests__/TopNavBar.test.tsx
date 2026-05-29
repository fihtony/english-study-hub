import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopNavBar from '../components/TopNavBar'
import { MemoryRouter } from 'react-router-dom'

describe('TopNavBar', () => {
  it('renders logo link', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Linguist Library')[0]).toBeTruthy()
  })

  it('renders nav links', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Lessons')[0]).toBeTruthy()
    expect(screen.getAllByText('Flashcards')[0]).toBeTruthy()
    expect(screen.getAllByText('Progress')[0]).toBeTruthy()
    expect(screen.getAllByText('Library')[0]).toBeTruthy()
  })

  it('renders Sign In button', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <TopNavBar />
      </MemoryRouter>
    )
    expect(screen.getAllByRole('button', { name: 'Sign In' })[0]).toBeTruthy()
  })
})