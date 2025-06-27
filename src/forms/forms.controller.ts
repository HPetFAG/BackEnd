import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Public } from 'src/config/constants';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Public()
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id',) id: number,
    @Body('status') status: string,
  ) {
    const form = await this.formsService.updateStatus(id, status);
    return { data: form };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}
