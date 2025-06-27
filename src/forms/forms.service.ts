import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
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

  // async create(createFormDto: CreateFormDto) {
  //   const animal = await this.animalRepository.findOne({
  //     where: { id: createFormDto.id_animal },
  //   });

  //   if (!animal) {
  //     throw new NotFoundException(
  //       `Animal com ID ${createFormDto.id_animal} não encontrado`,
  //     );
  //   }

  //   const form = this.formRepository.create({
  //     ...createFormDto,
  //     animal: { id: createFormDto.id_animal },
  //   });

  //   try {
  //     return await this.formRepository.save(form);
  //   } catch (error) {
  //     if (error instanceof QueryFailedError) {
  //       throw new ConflictException('Documento já cadastrado.');
  //     }
  //     throw error;
  //   }
  // }

  async create(createFormDto: CreateFormDto) {
    const animal = await this.animalRepository.findOne({
      where: { id: createFormDto.id_animal },
    });
    if (!animal) throw new NotFoundException();

    const form = this.formRepository.create({
      ...createFormDto,
      animal: { id: createFormDto.id_animal },
    });

    try {
      const savedForm = await this.formRepository.save(form);

      // atualiza status do animal
      animal.status = 'pentende'; // ou outro valor conforme a lógica
      await this.animalRepository.save(animal);

      return savedForm;
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
      order: {
        id: 'ASC', // ou 'DESC' para ordem decrescente
      },
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

  async updateStatus(id: number, status: string): Promise<Form> {
    const form = await this.formRepository.findOne({
      where: { id },
      relations: ['animal'],
    });
    if (!form) throw new NotFoundException('Formulário não encontrado');

    // Atualiza o status do formulário
    form.status = status;
    await this.formRepository.save(form);

    // Ajusta status do animal conforme a decisão do formulário
    if (form.animal) {
      if (status === 'Aprovado') {
        form.animal.status = 'adotado';
      } else if (status === 'Recusado' || status === 'Rejeitado') {
        form.animal.status = 'disponivel';
      }
      await this.animalRepository.save(form.animal);
    }

    return form;
  }

  remove(id: number) {
    return this.formRepository.delete({ id });
  }
}
