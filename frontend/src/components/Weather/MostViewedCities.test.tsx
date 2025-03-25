import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { MostViewedCities } from './MostViewedCities'
import { renderWithProviders } from '../../test/test-utils'

vi.mock('../../hooks/useMostViewedCities', () => ({
  useMostViewedCities: () => ({
    mostViewedCities: ['Vilnius', 'Kaunas', 'Klaipėda'],
  }),
}))

describe('MostViewedCities', () => {
  it('renders most viewed cities', () => {
    renderWithProviders(<MostViewedCities />)

    expect(screen.getByText('Most Viewed Cities')).toBeInTheDocument()
    expect(screen.getByText('Vilnius')).toBeInTheDocument()
    expect(screen.getByText('Kaunas')).toBeInTheDocument()
    expect(screen.getByText('Klaipėda')).toBeInTheDocument()
  })

  it('renders chips for each city', () => {
    renderWithProviders(<MostViewedCities />)

    const chips = screen.getAllByRole('button')
    expect(chips).toHaveLength(3)
  })
})
