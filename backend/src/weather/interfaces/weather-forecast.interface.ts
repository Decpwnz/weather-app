interface ForecastTimestamp {
  forecastTimeUtc: string;
  airTemperature: number;
  windSpeed: number;
  windDirection: number;
  cloudCover: number;
}

export interface WeatherForecastResponse {
  forecastTimestamps: ForecastTimestamp[];
}
