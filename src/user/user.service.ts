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



  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto); 
    console.log(user)
    return await this.userRepository.save(user); 
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(document: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { document } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(document: string) {
    console.log(typeof(document))
    return this.userRepository.delete({document});
  }
}
