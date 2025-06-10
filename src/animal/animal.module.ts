import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { MathService } from 'src/services/math.service';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalController],
  providers: [AnimalService, MathService],
  exports: [AnimalService, MathService]
})
export class AnimalModule {}
