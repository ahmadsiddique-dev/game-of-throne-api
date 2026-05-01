import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';
import { DragonType } from '../schema/dragon.schema';

export class CreateDragonDto {
  @IsString()
  name!: string;

  @IsNumber()
  age!: number;

  @IsString()
  color!: string;

  @IsBoolean()
  isFireBreathing!: boolean;

  @IsString({ each: true })
  rider!: string[];

  @IsString()
  type!: DragonType;

  @IsString()
  @MinLength(10)
  description!: string;
}
