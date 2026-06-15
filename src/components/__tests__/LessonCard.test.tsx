import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LessonCard from '../LessonCard'

const mockLesson = { id: '1', unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose' }

describe('LessonCard', () => {
  it('renders lesson unit and title', () => {
    render(<LessonCard lesson={mockLesson} />)
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax in Academic Prose')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<LessonCard lesson={mockLesson} />)
    const card = screen.getByRole('link', { name: /UNIT 01: Advanced Syntax in Academic Prose/i })
    expect(card).toBeInTheDocument()
  })

  it('calls onClick with lesson id when clicked', async () => {
    const user = userEvent.setup()
    render(<LessonCard lesson={mockLesson} />)
    const card = screen.getByRole('link')
    await user.click(card)
    expect(card).toHaveAttribute('href', '#lesson-1')
  })

  it('renders arrow forward icon', () => {
    render(<LessonCard lesson={mockLesson} />)
    const icon = document.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})