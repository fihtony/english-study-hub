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
    expect(screen.getByText(`© ${currentYear} Linguist Library.`)).toBeTruthy()
  })

  it('renders Terms of Service link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText('Terms of Service')).toBeTruthy()
  })

  it('renders Privacy Policy link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText('Privacy Policy')).toBeTruthy()
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
      <MemoryRouter>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/present perfect continuous/)).toBeTruthy()
  })

  it('renders Next button', () => {
    render(
      <MemoryRouter>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Next')).toBeTruthy()
  })

  it('has radio inputs for quiz options', () => {
    render(
      <MemoryRouter>
        <PracticeQuizPage />
      </MemoryRouter>
    )
    const radios = document.querySelectorAll('input[type="radio"]')
    expect(radios.length).toBe(4)
  })
})