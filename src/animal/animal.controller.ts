import { MathService } from 'src/services/math.service';
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
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@ApiTags('Animal') // Agrupa os endpoints no Swagger
@Controller('Animal')
export class AnimalController {
  constructor(
    private readonly animalService: AnimalService,
    private readonly mathService: MathService,
  ) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    console.log(createAnimalDto);
    return this.animalService.create(createAnimalDto);
  }

  @Get('total-registered')
  getTotalRegistered() {
    return this.mathService.calcTotalRegistered();
  }

  @Get('total-available')
  getTotalAvailables() {
    return this.mathService.calcTotalAvailables();
  }

  @Get('total-adopted')
  getAdotados() {
    return this.mathService.calcTotalAdopted();
  }

  @Get('total-in-progress')
  getTotalInProgress() {
    return this.mathService.calcTotalInProgress();
  }

  @Get('progress-available')
  async getProgressoDisponiveis() {
    return this.mathService.calcTotalAvailablesProgress();
  }

  @Get('progress-adopted')
  async getProgressoAdotados() {
    return this.mathService.calcTotalAdoptedProgress();
  }

  @Get('progress-in-progress')
  async getProgressoEmProcesso() {
    return this.mathService.calcTotalInProgressProgress();
  }

  @Get('progress-registered')
  async getProgressoCadastrados() {
    return this.mathService.calcTotalRegisteredProgress();
  }

  @Get('progress-adoption-rate')
  async metaAdoption() {
    return this.mathService.metaAdoption();
  }

  @Get('meta')
  async meta() {
    return this.mathService.meta();
  }

  @Public()
  @Get()
  async findAll(@Query('page') page = 1) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: 6,
    };
    return this.animalService.findAll(options);
  }

  @Get('search/status/:status')
  async buscarPorStatus(@Param('status') status: string, @Query('page') page = 1) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: 6,
    };
    return this.animalService.searchByStatus(status, options);
  }

  @Get('search')
  async buscarPorNome(@Query('name') name: string, @Query('page') page = 1) {
    const options: IPaginationOptions = {
      page: Number(page),
      limit: 6,
    };
    return this.animalService.searchByName(name, options);
  }

  @Public()
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
