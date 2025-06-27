import { PartialType } from '@nestjs/swagger';
import { CreateFormDto } from './create-form.dto';
import { IsEnum } from 'class-validator';
import { Decision } from 'src/config/enums/decision';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsEnum(Decision)
  decision: Decision;
}
