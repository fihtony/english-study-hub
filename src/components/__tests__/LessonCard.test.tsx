import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LessonCard from '../LessonCard'

describe('LessonCard', () => {
  it('renders with correct props', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" href="/lesson/1" />)
    
    expect(screen.getByText('UNIT 01')).toBeInTheDocument()
    expect(screen.getByText('Advanced Syntax')).toBeInTheDocument()
  })

  it('has correct href attribute', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" href="/lesson/1" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lesson/1')
  })

  it('is an anchor element for accessibility', () => {
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" href="/lesson/1" />)
    
    const link = screen.getByRole('link')
    expect(link.tagName).toBe('A')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    render(<LessonCard unit="UNIT 01" title="Advanced Syntax" href="/lesson/1" />)
    
    const link = screen.getByRole('link')
    await user.click(link)
    // Click event should not throw
  })
})
