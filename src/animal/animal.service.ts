import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from 'src/entities/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const Animal = this.animalRepository.create(createAnimalDto);
    return await this.animalRepository.save(Animal);
  }

   async findAll(options: IPaginationOptions): Promise<Pagination<Animal>> {
    const queryBuilder = this.animalRepository.createQueryBuilder('animals');

    queryBuilder.orderBy('id', 'DESC');

    return paginate<Animal>(queryBuilder, options)
  }

  async findOne(id: number): Promise<Animal | null> {
    return this.animalRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new Error(`Animal com ID ${id} não encontrado`);
    }

    const updatedAnimal = this.animalRepository.merge(animal, updateAnimalDto);
    return await this.animalRepository.save(updatedAnimal);
  }

  remove(id: number) {
    return this.animalRepository.delete({ id });
  }

  async searchByName(nome: string) {
  if (!nome) return this.animalRepository.find();

    return this.animalRepository.find({
      where: {
        name: Like(`%${nome}%`) // busca parcial por nome
      }
    });
  }
}
