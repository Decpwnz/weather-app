import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherForecastResponse } from './interfaces/weather-forecast.interface';
import { CitiesResponse } from './interfaces/city.interface';
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

    try {
      const { data } = await axios.get<WeatherForecastResponse>(
        `${this.apiUrl}/places/${cityName}/forecasts/long-term`,
      );

      const forecasts = data.forecastTimestamps;
      const currentWeather = forecasts[0];

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
        forecast: forecasts.map((forecast) => ({
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
    });
    await citySelection.save();
    console.log(`City selected: ${cityName} at ${new Date().toLocaleString()}`);
  }

  async getCitySelections() {
    return this.citySelectionModel.find().sort({ timestamp: -1 }).exec();
  }

  async getCitySelectionsCount() {
    const selections = await this.citySelectionModel.find().exec();
    const counts: Record<string, number> = {};
    selections.forEach((selection) => {
      counts[selection.cityName] = (counts[selection.cityName] || 0) + 1;
    });
    return counts;
  }

  async getCities() {
    try {
      const { data } = await axios.get<CitiesResponse>(`${this.apiUrl}/places`);
      return data.map((city) => ({
        name: city.name,
        code: city.code,
      }));
    } catch (error) {
      this.logger.error('Failed to fetch cities', error);
      throw error;
    }
  }
}
