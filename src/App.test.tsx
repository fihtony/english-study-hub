import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the application root', () => {
    render(<App />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
  })
})