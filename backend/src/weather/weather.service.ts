import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherForecastResponse } from './interfaces/weather-forecast.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CitySelection } from './entities/city-selection.entity';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(CitySelection.name)
    private citySelectionModel: Model<CitySelection>,
  ) {
    this.apiUrl =
      this.configService.get<string>('meteo.apiUrl') ||
      'https://api.meteo.lt/v1';
  }

  async getWeather(getWeatherDto: GetWeatherDto) {
    const { cityName } = getWeatherDto;

    this.logger.log(
      `Weather requested for city: ${cityName} at ${new Date().toISOString()}`,
    );

    try {
      const { data } = await axios.get<WeatherForecastResponse>(
        `${this.apiUrl}/places/${cityName}/forecasts/long-term`,
      );

      const forecasts = data.forecastTimestamps;
      const currentWeather = forecasts[0];
      const fiveDayForecast = forecasts.slice(0, 40);

      return {
        cityName,
        current: {
          temperature: currentWeather.airTemperature,
          windSpeed: currentWeather.windSpeed,
          windDirection: currentWeather.windDirection,
          cloudCover: currentWeather.cloudCover,
          forecastTimeUtc: currentWeather.forecastTimeUtc,
          humidity: currentWeather.relativeHumidity,
        },
        forecast: fiveDayForecast.map((forecast) => ({
          forecastTimeUtc: forecast.forecastTimeUtc,
          temperature: forecast.airTemperature,
          windSpeed: forecast.windSpeed,
          windDirection: forecast.windDirection,
          cloudCover: forecast.cloudCover,
          humidity: forecast.relativeHumidity,
        })),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch weather for city: ${cityName}`, error);
      throw error;
    }
  }

  async logCitySelection(cityName: string) {
    const citySelection = new this.citySelectionModel({
      cityName,
      timestamp: new Date(),
    });
    await citySelection.save();
    this.logger.log(
      `City selected: ${cityName} at ${new Date().toISOString()}`,
    );
  }
}
