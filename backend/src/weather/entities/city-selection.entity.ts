import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CitySelection extends Document {
  @Prop({ required: true })
  cityName: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const CitySelectionSchema = SchemaFactory.createForClass(CitySelection);
