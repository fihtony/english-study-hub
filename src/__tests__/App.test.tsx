import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import ArrowForwardIcon from '../components/ArrowForwardIcon'
import PracticeQuizPage from '../pages/PracticeQuizPage'

describe('TopNavBar', () => {
  it('renders logo text', () => {
    render(
      <MemoryRouter>
        <TopNavBar />
      </MemoryRouter>
    )
    const logo = screen.getByText('Linguist Library')
    expect(logo).toBeTruthy()
  })
})

describe('Footer', () => {
  it('renders dynamic copyright year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const currentYear = new Date().getFullYear()
    expect(screen.getAllByText(new RegExp(`${currentYear}`)).length).toBeGreaterThan(0)
  })

  it('renders Terms of Service link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Terms of Service').length).toBeGreaterThan(0)
  })

  it('renders Privacy Policy link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0)
  })
})

describe('ArrowForwardIcon', () => {
  it('renders without crashing', () => {
    render(<ArrowForwardIcon />)
    const svg = document.querySelector('svg')
    expect(svg).toBeTruthy()
  })
})

describe('PracticeQuizPage', () => {
  it('renders question progress', () => {
    render(
      <MemoryRouter>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    expect(screen.getByText('QUESTION 4 OF 12')).toBeTruthy()
    expect(screen.getByText('33% COMPLETE')).toBeTruthy()
  })

  it('renders quiz question text', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    expect(screen.getAllByText(/present perfect continuous/).length).toBeGreaterThan(0)
  })

  it('renders Next button', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Next').length).toBeGreaterThan(0)
  })

  it('has radio inputs for quiz options', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    const main = document.querySelector('main')
    const radios = main ? main.querySelectorAll('input[type="radio"]') : document.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBe(4)
  })
})