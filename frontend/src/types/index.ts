export interface WeatherState {
  currentWeather: any
  cities: City[]
  loading: boolean
  error: string | null
}

export interface ForecastWeather {
  forecastTimeUtc: string
  temperature: number
  windSpeed: number
  windDirection: number
  cloudCover: number
  humidity: number
}

export interface CityViews {
  name: string
  views: number
  lastViewed: number
}

export interface City {
  name: string
  code: string
}
