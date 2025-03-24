import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
export class Weather {
  @Prop({ required: true })
  cityName: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  feelsLike: number;

  @Prop({ required: true })
  windSpeed: number;

  @Prop({ required: true })
  windDirection: number;

  @Prop({ required: true })
  cloudCover: number;

  @Prop({ type: Object })
  forecast: {
    forecastTimeUtc: string;
    airTemperature: number;
    windSpeed: number;
    windDirection: number;
    cloudCover: number;
  }[];

  @Prop()
  lastUpdated: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
