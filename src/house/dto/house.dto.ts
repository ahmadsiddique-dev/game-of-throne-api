import { IsBoolean, IsString } from 'class-validator';
import { Founder } from '../schema/house.schema';

export class CreateHouseDto {
  @IsString()
  name!: string;

  @IsString()
  region!: string;

  @IsString()
  founer!: Founder;

  @IsString()
  description!: string;

  @IsString()
  words!: string;

  @IsBoolean()
  exist!: boolean;

  @IsString({ each: true })
  lords!: string[];

  @IsString({ each: true })
  ladies!: string[];
}

