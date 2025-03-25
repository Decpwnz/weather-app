import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { ForecastWeather } from './ForecastWeather'
import { renderWithProviders } from '../../test/test-utils'

describe('ForecastWeather', () => {
  it('shows loading spinner when loading', () => {
    renderWithProviders(<ForecastWeather />, {
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
    renderWithProviders(<ForecastWeather />, {
      preloadedState: {
        weather: {
          currentWeather: null,
          loading: false,
          error: 'Failed to fetch forecast',
        },
      },
    })

    expect(screen.getByText(/Failed to fetch forecast/i)).toBeInTheDocument()
  })

  it('displays forecast information when data is available', () => {
    const mockWeather = {
      cityName: 'Vilnius',
      forecast: [
        {
          forecastTimeUtc: '2024-03-25T12:00:00Z',
          temperature: 20,
          windSpeed: 5,
          windDirection: 180,
          cloudCover: 30,
        },
      ],
    }

    renderWithProviders(<ForecastWeather />, {
      preloadedState: {
        weather: {
          currentWeather: mockWeather,
          loading: false,
          error: null,
        },
      },
    })

    expect(screen.getByText(/5-Day Forecast for Vilnius/i)).toBeInTheDocument()
    expect(screen.getByText(/20°C/)).toBeInTheDocument()
  })
})
