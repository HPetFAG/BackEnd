import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from 'src/entities/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const Animal = this.animalRepository.create(createAnimalDto);
    console.log(Animal);
    return await this.animalRepository.save(Animal);
  }

  findAll() {
    return this.animalRepository.find();
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
    console.log(typeof id);
    return this.animalRepository.delete({ id });
  }
}
