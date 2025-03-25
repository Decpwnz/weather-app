import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { CitySearch } from './CitySearch'
import { renderWithProviders } from '../../test/test-utils'

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve()),
  },
}))

describe('CitySearch', () => {
  it('renders the city search input', () => {
    renderWithProviders(<CitySearch />)

    const input = screen.getByLabelText('Select a city')
    expect(input).toBeInTheDocument()
  })

  it('shows city options when clicked', async () => {
    renderWithProviders(<CitySearch />)

    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)

    const cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys']
    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument()
    })
  })

  it('handles city selection', async () => {
    const { store } = renderWithProviders(<CitySearch />)

    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)

    const vilniusOption = screen.getByText('Vilnius')
    fireEvent.click(vilniusOption)

    const actions = store.getState().weather
    expect(actions.loading).toBe(true)
  })
})
