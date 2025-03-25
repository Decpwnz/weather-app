import { useAppSelector } from '../../hooks/useAppDispatch'
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Stack } from '@mui/material'
import { ThermostatAuto, Air, Cloud, Schedule } from '@mui/icons-material'
import type { ForecastWeather } from '../../types'
import './../../styles/main.scss'

export function ForecastWeather() {
  const { currentWeather, loading, error } = useAppSelector((state) => state.weather)

  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mt: 2 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mt: 2 }}>
        <Alert severity="error">Error loading forecast data: {error}</Alert>
      </Box>
    )
  }

  if (!currentWeather?.forecast || currentWeather.forecast.length === 0) {
    return null
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mt: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom className="weather-card__title" sx={{ px: 2 }}>
        5-Day Forecast for {currentWeather.cityName}
      </Typography>

      <Box
        className="forecast-scroll"
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          px: 2,
          pb: 1,
        }}
      >
        {currentWeather.forecast.map((forecast: ForecastWeather, index: number) => (
          <Card
            key={index}
            className="weather-card"
            sx={{
              minWidth: 250,
              flex: '0 0 auto',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  {new Date(forecast.forecastTimeUtc).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Typography>

                <Box className="weather-card__info-row">
                  <ThermostatAuto />
                  <Typography>{forecast.temperature}°C</Typography>
                </Box>

                <Box className="weather-card__info-row">
                  <Air />
                  <Typography>
                    {forecast.windSpeed} m/s {forecast.windDirection}°
                  </Typography>
                </Box>

                <Box className="weather-card__info-row">
                  <Cloud />
                  <Typography>{forecast.cloudCover}%</Typography>
                </Box>

                <Box className="weather-card__info-row">
                  <Schedule />
                  <Typography>
                    {new Date(forecast.forecastTimeUtc).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
