import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/config/constants';
import { SearchAnimalDto } from './dto/search-animl.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@ApiTags('Animal') // Agrupa os endpoints no Swagger
@Controller('Animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Public()
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    console.log(createAnimalDto);
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  async findAll(@Query('page') page = 1) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: 6,
    };
    return this.animalService.findAll(options);
  }

  @Get('search')
  async buscarPorNome(@Query('name') name: string, @Query('page') page = 1) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: 6,
    };
    return this.animalService.searchByName(name, options);
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
