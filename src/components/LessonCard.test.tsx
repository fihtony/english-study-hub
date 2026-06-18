import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LessonCard from './LessonCard'

describe('LessonCard', () => {
  const defaultProps = {
    unitNumber: '01',
    unitLabel: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
  }

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
  }

  it('renders the unit label correctly', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
  })

  it('renders the lesson title correctly', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('renders the unit label with correct element', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    const unitLabel = screen.getByText('UNIT 01')
    expect(unitLabel).toHaveClass('font-label-caps')
  })

  it('renders the title with correct element', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    const title = screen.getByText('Advanced Syntax in Academic Prose')
    expect(title.tagName).toBe('H2')
    expect(title).toHaveClass('font-h3')
  })

  it('renders with different unit numbers', () => {
    renderWithRouter(
      <LessonCard {...defaultProps} unitNumber="02" unitLabel="UNIT 02" />
    )
    expect(screen.getByText('UNIT 02')).toBeInTheDocument()
  })

  it('renders with different lesson titles', () => {
    renderWithRouter(
      <LessonCard {...defaultProps} title="Etymology and the Evolution of Modern Lexicon" />
    )
    expect(screen.getByText('Etymology and the Evolution of Modern Lexicon')).toBeInTheDocument()
  })

  it('renders the arrow icon', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('is a link element', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  it('uses custom href when provided', () => {
    renderWithRouter(
      <LessonCard {...defaultProps} href="/lesson/advanced-syntax" />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lesson/advanced-syntax')
  })

  it('defaults to # href when not provided', () => {
    renderWithRouter(<LessonCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '#')
  })
})
