import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App', () => {
  it('renders the app with quiz route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    // Verify the logo is present in the navbar
    const logo = screen.getByText((content, element) =>
      element?.tagName === 'SPAN' && content.includes('Linguist Library')
    )
    expect(logo).toBeTruthy()
  })
})