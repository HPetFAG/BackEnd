import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}

  async create(createFormDto: CreateFormDto) {
    const form = this.formRepository.create(createFormDto);
    return await this.formRepository.save(form)
  }

  findAll() {
    return this.formRepository.find({});
  }

  findOne(id: number) {
    return this.formRepository.find({
      where: { id },
    });
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return this.formRepository.delete({ id });
  }
}
