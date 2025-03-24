import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query(ValidationPipe) query: GetWeatherDto) {
    return this.weatherService.getWeather(query);
  }
}
