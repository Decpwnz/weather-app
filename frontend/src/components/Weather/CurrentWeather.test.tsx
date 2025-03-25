import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { CurrentWeather } from './CurrentWeather'
import { renderWithProviders } from '../../test/test-utils'

describe('CurrentWeather', () => {
  it('shows loading spinner when loading', () => {
    renderWithProviders(<CurrentWeather />, {
      preloadedState: {
        weather: {
          currentWeather: null,
          loading: true,
          error: null,
        },
      },
    })

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows error message when there is an error', () => {
    renderWithProviders(<CurrentWeather />, {
      preloadedState: {
        weather: {
          currentWeather: null,
          loading: false,
          error: 'Failed to fetch weather',
        },
      },
    })

    expect(screen.getByText(/Failed to fetch weather/i)).toBeInTheDocument()
  })

  it('displays basic weather information when data is available', () => {
    const mockWeather = {
      cityName: 'Vilnius',
      current: {
        temperature: 20,
        windSpeed: 5,
        windDirection: 180,
        cloudCover: 30,
        humidity: 45,
        forecastTimeUtc: '2024-03-25T12:00:00Z',
      },
    }

    renderWithProviders(<CurrentWeather />, {
      preloadedState: {
        weather: {
          currentWeather: mockWeather,
          loading: false,
          error: null,
        },
      },
    })

    expect(screen.getByText(/Vilnius/)).toBeInTheDocument()
    expect(screen.getByText(/20°C/)).toBeInTheDocument()
  })
})
