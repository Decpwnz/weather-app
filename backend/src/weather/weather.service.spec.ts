import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let service: WeatherService;

  const mockWeatherResponse = {
    forecastTimestamps: [
      {
        airTemperature: 20,
        windSpeed: 5,
        windDirection: 180,
        cloudCover: 30,
        forecastTimeUtc: '2024-03-25T12:00:00Z',
        relativeHumidity: 65,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://api.meteo.lt/v1'),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and format weather data successfully', async () => {
    const mockGet = jest
      .fn()
      .mockResolvedValueOnce({ data: mockWeatherResponse });
    mockedAxios.get = mockGet;

    const result = await service.getWeather({ cityName: 'Vilnius' });

    expect(result).toHaveProperty('cityName', 'Vilnius');
    expect(result.current).toHaveProperty('temperature', 20);
    expect(result.current).toHaveProperty('windSpeed', 5);
    expect(result.current).toHaveProperty('humidity', 65);
    expect(mockGet).toHaveBeenCalledWith(
      'https://api.meteo.lt/v1/places/Vilnius/forecasts/long-term',
    );
  });

  it('should handle API errors', async () => {
    const error = new Error('API Error');
    mockedAxios.get.mockRejectedValueOnce(error);

    await expect(service.getWeather({ cityName: 'Vilnius' })).rejects.toThrow(
      'API Error',
    );
  });
});
