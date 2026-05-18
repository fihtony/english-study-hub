import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

test('renders landing page with all components', () => {
  const { getByText, getAllByText } = render(<App />)

  // Check headline
  expect(getByText(/Master Academic English with Scholarly Precision/i)).toBeTruthy()

  // Check CTA button
  expect(getByText(/Start Learning Now/i)).toBeTruthy()

  // Check category links
  expect(getByText(/Advanced Grammar/i)).toBeTruthy()
  expect(getByText(/Research Writing/i)).toBeTruthy()
  expect(getByText(/Formal Vocabulary/i)).toBeTruthy()

  // Check nav links
  expect(getAllByText(/Lessons/i)).toBeTruthy()
  expect(getAllByText(/Flashcards/i)).toBeTruthy()
  expect(getAllByText(/Progress/i)).toBeTruthy()
  expect(getAllByText(/Library/i)).toBeTruthy()

  // Check sign in button
  expect(getByText(/Sign In/i)).toBeTruthy()

  // Check footer
  expect(getByText(/© 2024 Linguist Library/i)).toBeTruthy()
  expect(getByText(/Terms of Service/i)).toBeTruthy()
  expect(getByText(/Privacy Policy/i)).toBeTruthy()
  expect(getByText(/Contact Support/i)).toBeTruthy()
})