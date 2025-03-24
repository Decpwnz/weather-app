import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query(ValidationPipe) query: GetWeatherDto) {
    return this.weatherService.getWeather(query);
  }

  @Post('log-selection')
  logCitySelection(@Body() data: { cityName: string }) {
    const timestamp = new Date().toISOString();
    console.log(`City selected: ${data.cityName} at ${timestamp}`);
    return { message: 'City selection logged successfully' };
  }
}
