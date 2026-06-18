/// <reference types="vitest" />
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the practice quiz page', () => {
  render(<App />)
  expect(screen.getByText('QUESTION 4 OF 12')).toBeInTheDocument()
  expect(screen.getByText('Which of the following sentences correctly utilizes the present perfect continuous tense?')).toBeInTheDocument()
})
