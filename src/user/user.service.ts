import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  /**
   *
   * Injetando entidade dentro do service para uso.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   *
   * Para criar um registro no banco com typeORM precisamos criar o objeto e depois salvar
   */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    console.log(user);
    return await this.userRepository.save(user);
  }

  /**
   *
   * Uma Consulta normal
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   *
   * Consultando registro pelo Documento (CPF/CNPJ)
   * Integrado com o JWT
   */
  async findOne(document: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { document } });
  }

  /**
   *
   * Update metodo inacabado devido a features futuras
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  /**
   *
   * Deletar um usuario de acorod com seu Documento
   */
  remove(document: string) {
    console.log(typeof document);
    return this.userRepository.delete({ document });
  }
}
