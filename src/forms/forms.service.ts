import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Animal } from 'src/entities/animal.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,

    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(createFormDto: CreateFormDto) {
    const animal = await this.animalRepository.findOne({
      where: { id: createFormDto.id_animal },
    });

    if (!animal) {
      throw new NotFoundException(
        `Animal com ID ${createFormDto.id_animal} não encontrado`,
      );
    }

    const form = this.formRepository.create({
      ...createFormDto,
      animal: { id: createFormDto.id_animal },
    });

    try {
      return await this.formRepository.save(form);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Documento já cadastrado.');
      }
      throw error;
    }
  }

  async findAll() {
    const forms = await this.formRepository.find({
      relations: ['animal'],
    });

    return forms.map((form) => ({
      ...form,
      animal: {
        id: form.animal?.id,
        name: form.animal?.name,
      },
    }));
  }

  async findOne(id: number) {
    const forms = await this.formRepository.find({
      where: { id },
      relations: ['animal'],
    });

    return forms.map((form) => ({
      ...form,
      animal: {
        id: form.animal?.id,
        name: form.animal?.name,
      },
    }));
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return this.formRepository.delete({ id });
  }
}
