import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;
export enum Title {
  LORD = 'Lord',
  LADY = 'Lady',
  SER = 'Ser',
  KING = 'King',
  QUEEN = 'Queen',
  PRINCE = 'Prince',
  PRINCESS = 'Princess',
}

@Schema()
export class Character {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true })
  house!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  isBastard!: boolean;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(Title),
  })
  noun!: Title;

  @Prop({ required: true })
  age!: number;

  @Prop({ required: true, minlength: 10 })
  description!: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
