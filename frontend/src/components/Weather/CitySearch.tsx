import { Autocomplete, TextField, Box } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchWeather } from '../../store/slices/weatherSlice'
import { useMostViewedCities } from '../../hooks/useMostViewedCities'
import axios from 'axios'

const CITIES = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys']

export function CitySearch() {
  const dispatch = useAppDispatch()
  const { addCityView } = useMostViewedCities()
  const [value, setValue] = useState<string | null>(null)

  const logCitySelection = async (cityName: string) => {
    try {
      await axios.post('http://localhost:3000/weather/log-selection', {
        cityName,
      })
    } catch (error) {
      console.error('Failed to log city selection:', error)
    }
  }

  const handleCityChange = async (_event: any, newValue: string | null) => {
    setValue(newValue)

    if (newValue) {
      addCityView(newValue)
      dispatch(fetchWeather(newValue))
      await logCitySelection(newValue)
    }
  }

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
