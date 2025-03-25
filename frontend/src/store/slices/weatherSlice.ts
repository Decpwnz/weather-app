import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { WeatherState } from '../../types'

const initialState: WeatherState = {
  currentWeather: null,
  cities: [],
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (cityName: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather?cityName=${cityName}`)
  return response.data
})

export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/cities`)
  return response.data
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch weather'
      })
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload
        state.loading = false
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.error.message || null
        state.loading = false
      })
  },
})

export default weatherSlice.reducer
