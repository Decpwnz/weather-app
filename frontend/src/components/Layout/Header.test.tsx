import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import { describe, it, expect } from 'vitest'

describe('Header', () => {
  it('renders the header with correct text', () => {
    render(<Header />)

    const headerText = screen.getByText('Weather App')
    expect(headerText).toBeInTheDocument()
  })

  it('renders within AppBar component', () => {
    const { container } = render(<Header />)

    const appBar = container.querySelector('.MuiAppBar-root')
    expect(appBar).toBeInTheDocument()
  })
})
