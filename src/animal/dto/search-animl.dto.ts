import { IsOptional, IsString } from 'class-validator';

export class SearchAnimalDto {
  @IsOptional()
  @IsString()
  search?: string;
}