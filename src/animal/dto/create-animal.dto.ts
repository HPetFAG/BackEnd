import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsOptional()
  @IsString()
  physicalDescription?: string;

  @IsBoolean()
  vaccinated: boolean;

  @IsBoolean()
  castrated: boolean;

  @IsBoolean()
  microchipped: boolean;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsString()
  status?: string = 'Disponivel';
}
