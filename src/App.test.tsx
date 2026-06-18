import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the application root', () => {
  render(<App />)
  expect(screen.getByTestId('app-root')).toBeInTheDocument()
})
