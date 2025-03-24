export interface WeatherState {
  currentWeather: any
  loading: boolean
  error: string | null
}

export interface ForecastWeather {
  forecastTimeUtc: string
  temperature: number
  windSpeed: number
  windDirection: number
  cloudCover: number
}
