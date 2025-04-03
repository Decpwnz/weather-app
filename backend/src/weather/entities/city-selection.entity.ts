import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CitySelection extends Document {
  @Prop({ required: true })
  cityName: string;
}

export const CitySelectionSchema = SchemaFactory.createForClass(CitySelection);
