import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { WeatherState } from '../../types'

const initialState: WeatherState = {
  currentWeather: null,
  loading: false,
  error: null,
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (cityName: string) => {
  const response = await axios.get(`http://localhost:3000/weather?cityName=${cityName}`)
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
  },
})

export default weatherSlice.reducer
