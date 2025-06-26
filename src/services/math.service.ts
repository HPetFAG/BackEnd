import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MathService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}
  /**
   * Calcula o total de cadastros de animais.
   * @returns O total de cadastros.
   */
  async calcTotalRegistered(): Promise<number> {
    return this.animalRepository.count();
  }

  /**
   * Calcula o total de animais disponíveis para adoção.
   * @returns O total de animais disponíveis.
   */
  calcTotalAvailables(): Promise<number> {
    return this.animalRepository.count({where: { status: 'disponivel' } });
  }

  /**
   * Calcula o total de animais adotados.
   * @returns O total de animais adotados.
   */
  calcAdotados(): number {
    const adotados = 30; // Exemplo de valor de animais adotados
    return adotados;
  }

  /**
   * Calcula o total de animais em processo de adoção.
   * @returns O total de animais em processo de adoção.
   */
  calcEmAndamento(): number {
    const emAndamento = 20; // Exemplo de valor de animais em processo de adoção
    return emAndamento;
  }
}
