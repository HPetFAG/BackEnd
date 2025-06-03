import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsArray, IsOptional} from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  historical_health?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  special_needs?: string[];
}