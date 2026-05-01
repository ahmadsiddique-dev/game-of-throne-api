import { IsBoolean, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name!: string;

  @IsString()
  house!: string;

  @IsString()
  title!: string;

  @IsBoolean()
  isBastard!: boolean;

  @IsString()
  noun!: string;

  @IsString()
  description!: string;

  @IsString()
  age!: number;
}

