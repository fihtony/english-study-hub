import { render, screen, cleanup } from '@testing-library/react'
import LessonLibraryPage from '../LessonLibraryPage'
import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

describe('LessonLibraryPage', () => {
  it('renders CURRICULUM label', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('CURRICULUM')).toBeInTheDocument()
  })

  it('renders h1 with Lesson Library heading', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Lesson Library')
  })

  it('renders all 5 lesson cards with correct aria-labels', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    // Get links by their aria-label which includes UNIT and title
    expect(screen.getByLabelText(/UNIT 01: Advanced Syntax in Academic Prose/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/UNIT 01: Etymology and the Evolution of Modern Lexicon/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/UNIT 02: Nuanced Argumentation: The Art of the Thesis/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/UNIT 02: Comparative Literature: Analyzing Cross-Cultural Themes/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/UNIT 03: Scientific Methodology and Report Composition/i)).toBeInTheDocument()
  })

  it('lesson cards use lesson.id as key', () => {
    const { container } = render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    // Find all anchor tags that have aria-label starting with "UNIT"
    const lessonLinks = container.querySelectorAll('a[aria-label^="UNIT"]')
    expect(lessonLinks).toHaveLength(5)
    expect(lessonLinks[0].getAttribute('href')).toBe('#lesson-1')
    expect(lessonLinks[1].getAttribute('href')).toBe('#lesson-2')
    expect(lessonLinks[2].getAttribute('href')).toBe('#lesson-3')
    expect(lessonLinks[3].getAttribute('href')).toBe('#lesson-4')
    expect(lessonLinks[4].getAttribute('href')).toBe('#lesson-5')
  })

  it('renders correct lesson titles', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
    expect(screen.getByText('Etymology and the Evolution of Modern Lexicon')).toBeInTheDocument()
    expect(screen.getByText('Nuanced Argumentation: The Art of the Thesis')).toBeInTheDocument()
    expect(screen.getByText('Comparative Literature: Analyzing Cross-Cultural Themes')).toBeInTheDocument()
    expect(screen.getByText('Scientific Methodology and Report Composition')).toBeInTheDocument()
  })

  it('renders correct unit labels', () => {
    render(
      <MemoryRouter>
        <LessonLibraryPage />
      </MemoryRouter>
    )
    const unitLabels = screen.getAllByText(/UNIT 0[1-3]/)
    expect(unitLabels).toHaveLength(5)
  })
})