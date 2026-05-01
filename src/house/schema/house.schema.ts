import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type rulerType = { name: string; number: number };
export type HouseDocument = HydratedDocument<House>;
export enum Founder {
  BRANDON = 'Brandon the Builder',
  GARTH = 'Garth Greenhand',
  LANN = 'Lann the Clever',
  DURRAN = 'Durran Godsgrief',
  GWYN = 'Gwyn the Golden',
  GORGE = 'Gorge the Godless',
  NYMERIA = 'Nymeria the Warrior Queen',
}

@Schema()
export class House {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true })
  region!: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(Founder),
  })
  founder!: Founder;

  @Prop({ required: true, minlength: 10 })
  description!: string;

  @Prop({ required: true })
  words!: string;

  @Prop({ required: true })
  exist!: boolean;

  @Prop({ required: true })
  lords!: rulerType[];

  @Prop({ required: true })
  ladies!: rulerType[];
}

export const HouseSchema = SchemaFactory.createForClass(House);
