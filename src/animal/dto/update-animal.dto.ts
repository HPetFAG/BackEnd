import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, IsArray, IsOptional} from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  historico_saude?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  necessidades_especiais?: string[];
}