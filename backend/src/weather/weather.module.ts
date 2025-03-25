import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import {
  CitySelection,
  CitySelectionSchema,
} from './entities/city-selection.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: CitySelection.name, schema: CitySelectionSchema },
    ]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
