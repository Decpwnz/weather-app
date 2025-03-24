import { useAppSelector } from '../../hooks/useAppDispatch'
import { Card, CardContent, Typography, Box, CircularProgress, Alert, Stack } from '@mui/material'
import { ThermostatAuto, Air, WaterDrop, Cloud, Schedule } from '@mui/icons-material'

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

  const { temperature, windSpeed, windDirection, cloudCover, forecastTimeUtc, humidity } =
    currentWeather.current

  return (
    <Card sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Weather in {currentWeather.cityName}
        </Typography>

        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThermostatAuto />
            <Typography>Temperature: {temperature}°C</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Air />
            <Typography>
              Wind: {windSpeed} m/s {windDirection}°
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WaterDrop />
            <Typography>Humidity: {humidity}%</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cloud />
            <Typography>Cloud Cover: {cloudCover}%</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Schedule />
            <Typography>Time: {new Date(forecastTimeUtc).toLocaleString()}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
