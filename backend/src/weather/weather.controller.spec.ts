import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let controller: WeatherController;

  const mockWeatherService = {
    getWeather: jest.fn().mockResolvedValue({
      cityName: 'Vilnius',
      current: {
        temperature: 20,
        windSpeed: 5,
        windDirection: 180,
        cloudCover: 30,
        humidity: 65,
      },
      forecast: [],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get weather data', async () => {
    const query = { cityName: 'Vilnius' };
    const result = await controller.getWeather(query);

    expect(result).toHaveProperty('cityName', 'Vilnius');
    expect(result.current).toHaveProperty('temperature', 20);
    expect(mockWeatherService.getWeather).toHaveBeenCalledWith(query);
  });

  it('should log city selection', () => {
    const data = { cityName: 'Vilnius' };
    const result = controller.logCitySelection(data);

    expect(result).toEqual({ message: 'City selection logged successfully' });
  });
});
