import { useAppSelector } from '../../hooks/useAppDispatch'
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Stack } from '@mui/material'
import { ThermostatAuto, Air, Cloud, Schedule } from '@mui/icons-material'
import type { ForecastWeather } from '../../types'

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
      <Typography variant="h6" gutterBottom sx={{ px: 2 }}>
        5-Day Forecast for {currentWeather.cityName}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          px: 2,
          pb: 1,
          '::-webkit-scrollbar': {
            height: 8,
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 4,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 4,
          },
        }}
      >
        {currentWeather.forecast.map((forecast: ForecastWeather, index: number) => (
          <Card
            key={index}
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

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ThermostatAuto />
                  <Typography>{forecast.temperature}°C</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Air />
                  <Typography>
                    {forecast.windSpeed} m/s {forecast.windDirection}°
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Cloud />
                  <Typography>{forecast.cloudCover}%</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
