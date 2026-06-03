import '@testing-library/jest-dom'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

test('renders footer with copyright', () => {
  render(<Footer />)

  const currentYear = new Date().getFullYear()
  expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
})

test('renders Linguist Library brand text', () => {
  render(<Footer />)

  expect(screen.getByText(/Linguist Library/)).toBeInTheDocument()
  expect(screen.getByText(/Premium Academic English Study/)).toBeInTheDocument()
})

test('renders policy links', () => {
  render(<Footer />)

  expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  expect(screen.getByText('Contact Support')).toBeInTheDocument()
})

test('policy links have href attributes', () => {
  render(<Footer />)

  const links = screen.getAllByRole('link')
  expect(links.length).toBe(3)
  links.forEach(link => {
    expect(link).toHaveAttribute('href')
  })
})
