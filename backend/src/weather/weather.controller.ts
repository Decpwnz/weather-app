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
  async logCitySelection(@Body() data: { cityName: string }) {
    const timestamp = new Date().toISOString();
    console.log(`City selected: ${data.cityName} at ${timestamp}`);
    await this.weatherService.logCitySelection(data.cityName);
    return { message: 'City selection logged successfully' };
  }

  @Get('selections')
  async getCitySelections() {
    return this.weatherService.getCitySelections();
  }

  @Get('selections/count')
  async getCitySelectionsCount() {
    return this.weatherService.getCitySelectionsCount();
  }

  @Get('cities')
  async getCities() {
    return this.weatherService.getCities();
  }
}
