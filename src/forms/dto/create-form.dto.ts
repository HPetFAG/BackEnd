import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  id_animal: number;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  residenceType: string;

  @IsBoolean()
  hasYard: boolean;

  @IsBoolean()
  hasOtherAnimals: boolean;

  @IsBoolean()
  currentlyHasOtherAnimals: boolean;

  @IsBoolean()
  hasExperience: boolean;

  @IsString()
  @IsNotEmpty()
  reasonToAdopt: string;
}
