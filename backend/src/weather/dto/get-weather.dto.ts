import { IsString, IsNotEmpty } from 'class-validator';

export class GetWeatherDto {
  @IsString()
  @IsNotEmpty()
  cityName: string;
}
