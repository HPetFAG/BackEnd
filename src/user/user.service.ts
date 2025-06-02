import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(document: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { document } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto); // cria a instância
    console.log(user)
    return await this.userRepository.save(user); // salva no banco
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne2(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
