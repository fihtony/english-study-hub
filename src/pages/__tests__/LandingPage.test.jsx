import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

describe('LandingPage', () => {
  it('renders all sections', () => {
    render(<LandingPage />)
    expect(screen.getByText('Linguist Library')).toBeInTheDocument()
    expect(screen.getByText('Master Academic English with Scholarly Precision.')).toBeInTheDocument()
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
    expect(screen.getByText('Advanced Grammar')).toBeInTheDocument()
    expect(screen.getByText('Research Writing')).toBeInTheDocument()
    expect(screen.getByText('Formal Vocabulary')).toBeInTheDocument()
    expect(screen.getByText('© 2024 Linguist Library. Premium Academic English Study.')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })
})