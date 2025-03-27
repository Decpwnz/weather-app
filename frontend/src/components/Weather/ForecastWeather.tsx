import { useAppSelector } from '../../hooks/useAppDispatch'
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Tabs,
  Tab,
} from '@mui/material'
import { ThermostatAuto, Air, Cloud, WaterDrop } from '@mui/icons-material'
import type { ForecastWeather } from '../../types'
import './../../styles/main.scss'
import { useState, useMemo } from 'react'

export function ForecastWeather() {
  const { currentWeather, loading, error } = useAppSelector((state) => state.weather)
  const [selectedDay, setSelectedDay] = useState(0)

  const groupedForecasts = useMemo(() => {
    if (!currentWeather?.forecast) return []

    const groups: { [key: string]: ForecastWeather[] } = {}

    const sortedForecasts = [...currentWeather.forecast].sort(
      (a, b) => new Date(a.forecastTimeUtc).getTime() - new Date(b.forecastTimeUtc).getTime()
    )

    sortedForecasts.forEach((forecast: ForecastWeather) => {
      const forecastDate = new Date(forecast.forecastTimeUtc)
      const date = forecastDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Europe/Vilnius',
      })

      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(forecast)
    })

    return Object.entries(groups)
      .slice(0, 5)
      .map(([date, forecasts]) => ({
        date,
        forecasts: forecasts.sort((a, b) => {
          const timeA = new Date(a.forecastTimeUtc)
          const timeB = new Date(b.forecastTimeUtc)
          const hourA = timeA.getHours() === 0 ? 24 : timeA.getHours()
          const hourB = timeB.getHours() === 0 ? 24 : timeB.getHours()
          return hourA - hourB
        }),
        dayName: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }),
        dateNum: new Date(date).getDate(),
        avgTemp: Math.round(
          forecasts.reduce((sum, f) => sum + f.temperature, 0) / forecasts.length
        ),
      }))
  }, [currentWeather?.forecast])

  if (loading) {
    return (
      <Box className="forecast-container">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="forecast-container">
        <Alert severity="error">Error loading forecast data: {error}</Alert>
      </Box>
    )
  }

  if (!currentWeather?.forecast || currentWeather.forecast.length === 0) {
    return null
  }

  return (
    <Box className="forecast-container">
      <Typography variant="h5" gutterBottom className="weather-card__title">
        5-Day Forecast for {currentWeather.cityName}
      </Typography>

      <Tabs
        value={selectedDay}
        onChange={(_, newValue) => setSelectedDay(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        className="forecast-tabs"
      >
        {groupedForecasts.map((day) => (
          <Tab
            key={day.date}
            label={
              <Box className="tab-content">
                <Typography variant="body1" className="tab-content__day">
                  {day.dayName} <span>{day.dateNum}</span>
                </Typography>
                <Typography variant="h6">{day.avgTemp}°</Typography>
              </Box>
            }
          />
        ))}
      </Tabs>

      <Box className="forecast-scroll">
        {groupedForecasts[selectedDay]?.forecasts.map(
          (forecast: ForecastWeather, index: number) => (
            <Card
              key={index}
              className="weather-card"
              sx={{
                borderRadius: '16px',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" className="weather-card__time">
                    {new Date(forecast.forecastTimeUtc).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
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
                    <WaterDrop />
                    <Typography>{forecast.humidity}%</Typography>
                  </Box>

                  <Box className="weather-card__info-row">
                    <Cloud />
                    <Typography>{forecast.cloudCover}%</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          )
        )}
      </Box>
    </Box>
  )
}
