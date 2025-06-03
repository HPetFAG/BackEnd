import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/config/constants';

@ApiTags('Animal') // Agrupa os endpoints no Swagger
@Controller('Animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Public()
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    console.log(createAnimalDto)
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.animalService.remove(+id);
  }
}
