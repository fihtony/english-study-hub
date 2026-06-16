import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import NextButton from './NextButton'

describe('NextButton', () => {
  it('renders the NextButton component', () => {
    const { getByRole } = render(<NextButton />)
    expect(getByRole('button')).toBeDefined()
  })

  it('contains "Next" text', () => {
    const { getByText } = render(<NextButton />)
    expect(getByText('Next')).toBeDefined()
  })
})