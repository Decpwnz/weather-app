import { Box, Typography, Chip, Stack } from '@mui/material'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchWeather } from '../../store/slices/weatherSlice'
import { useMostViewedCities } from '../../hooks/useMostViewedCities'

export function MostViewedCities() {
  const dispatch = useAppDispatch()
  const { mostViewedCities } = useMostViewedCities()

  if (mostViewedCities.length === 0) {
    return null
  }

  const handleCityClick = (city: string) => {
    dispatch(fetchWeather(city))
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom color="primary" textAlign="center">
        Most Viewed Cities
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center">
        {mostViewedCities.map((city) => (
          <Chip
            key={city}
            label={city}
            onClick={() => handleCityClick(city)}
            clickable
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </Box>
  )
}
