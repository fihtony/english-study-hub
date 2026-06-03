import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

describe('App', () => {
  it('renders Lesson Library page', () => {
    render(<App />)
    expect(screen.getByText('Lesson Library')).toBeInTheDocument()
  })
})