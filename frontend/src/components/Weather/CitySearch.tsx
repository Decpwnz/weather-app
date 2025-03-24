import { Autocomplete, TextField, Box } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { fetchWeather } from '../../store/slices/weatherSlice'

const CITIES = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys']

export function CitySearch() {
  const dispatch = useAppDispatch()
  const { currentWeather, loading, error } = useAppSelector((state) => state.weather)
  const [value, setValue] = useState<string | null>(null)

  const handleCityChange = (_event: any, newValue: string | null) => {
    setValue(newValue)
    if (newValue) {
      console.log('Selected city:', newValue)
      dispatch(fetchWeather(newValue))
    }
  }

  console.log('Current weather:', {
    data: currentWeather,
    loading,
    error,
  })

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <Autocomplete
        value={value}
        onChange={handleCityChange}
        options={CITIES}
        renderInput={(params) => (
          <TextField {...params} label="Select a city" variant="outlined" fullWidth />
        )}
      />
    </Box>
  )
}
