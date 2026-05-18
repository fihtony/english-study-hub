import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

test('LandingPage renders headline', () => {
  render(<LandingPage />)
  expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeTruthy()
})

test('LandingPage renders CTA button', () => {
  render(<LandingPage />)
  expect(screen.getByText('Start Learning Now')).toBeTruthy()
})

test('LandingPage renders category links', () => {
  render(<LandingPage />)
  expect(screen.getByText('Advanced Grammar')).toBeTruthy()
  expect(screen.getByText('Research Writing')).toBeTruthy()
  expect(screen.getByText('Formal Vocabulary')).toBeTruthy()
})

test('Header renders logo and nav', () => {
  render(<Header />)
  expect(screen.getByText('Linguist Library')).toBeTruthy()
  expect(screen.getByText('Lessons')).toBeTruthy()
  expect(screen.getByText('Flashcards')).toBeTruthy()
  expect(screen.getByText('Progress')).toBeTruthy()
  expect(screen.getByText('Library')).toBeTruthy()
  expect(screen.getByText('Sign In')).toBeTruthy()
})

test('Footer renders copyright and links', () => {
  render(<Footer />)
  expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeTruthy()
  expect(screen.getByText('Terms of Service')).toBeTruthy()
  expect(screen.getByText('Privacy Policy')).toBeTruthy()
  expect(screen.getByText('Contact Support')).toBeTruthy()
})