import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form } from 'src/entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { AnimalService } from 'src/animal/animal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), TypeOrmModule.forFeature([Animal])],
  controllers: [FormsController],
  providers: [FormsService, AnimalService],
  exports: [FormsService, AnimalService],
})
export class FormsModule {}
