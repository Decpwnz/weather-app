import { Autocomplete, TextField, Box } from '@mui/material'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchWeather } from '../../store/slices/weatherSlice'
import { useMostViewedCities } from '../../hooks/useMostViewedCities'
import axios from 'axios'
import { City } from '../../types'
import { useCities } from '../../hooks/useCities'

export function CitySearch() {
  const dispatch = useAppDispatch()
  const { addCityView } = useMostViewedCities()
  const { cities, loading } = useCities()

  const handleCityChange = async (_event: any, city: City | null) => {
    if (city) {
      dispatch(fetchWeather(city.code))
      addCityView(city.name)
      await logCitySelection(city.name)
    }
  }

  const logCitySelection = async (cityName: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/weather/log-selection`, {
        cityName,
      })
    } catch (error) {
      console.error('Failed to log city selection:', error)
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 2 }}>
      <Autocomplete
        options={cities}
        getOptionLabel={(city) => city.name}
        loading={loading}
        renderInput={(params) => (
          <TextField {...params} label="Select a city" variant="outlined" fullWidth />
        )}
        onChange={handleCityChange}
        renderOption={(props, city) => (
          <li {...props} key={city.code}>
            {city.name}
          </li>
        )}
      />
    </Box>
  )
}
