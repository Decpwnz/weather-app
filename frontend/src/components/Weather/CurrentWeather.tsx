import { useAppSelector } from '../../hooks/useAppDispatch'
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Stack } from '@mui/material'
import { ThermostatAuto, Air, WaterDrop, Cloud, Schedule } from '@mui/icons-material'
import './../../styles/main.scss'

export function CurrentWeather() {
  const { currentWeather, loading, error } = useAppSelector((state) => state.weather)

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          mt: 2,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
        <Alert severity="error">Error loading weather data: {error}</Alert>
      </Box>
    )
  }

  if (!currentWeather?.current) {
    return null
  }

  const { temperature, windSpeed, windDirection, humidity, cloudCover, forecastTimeUtc } =
    currentWeather.current

  return (
    <Card className="weather-card" sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <CardContent className="weather-card__content">
        <Typography variant="h6" gutterBottom className="weather-card__title">
          Current Weather in {currentWeather.cityName}
        </Typography>

        <Stack spacing={2}>
          <Box className="weather-card__info-row">
            <ThermostatAuto />
            <Typography>Temperature: {temperature}°C</Typography>
          </Box>

          <Box className="weather-card__info-row">
            <Air />
            <Typography>
              Wind: {windSpeed} m/s {windDirection}°
            </Typography>
          </Box>

          <Box className="weather-card__info-row">
            <WaterDrop />
            <Typography>Humidity: {humidity}%</Typography>
          </Box>

          <Box className="weather-card__info-row">
            <Cloud />
            <Typography>Cloud Cover: {cloudCover}%</Typography>
          </Box>

          <Box className="weather-card__info-row">
            <Schedule />
            <Typography>Time: {new Date(forecastTimeUtc).toLocaleString()}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
