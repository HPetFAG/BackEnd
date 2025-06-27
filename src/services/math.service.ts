import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';
import { LessThanOrEqual, LessThan, MoreThanOrEqual } from 'typeorm';

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
  calcTotalAdopted(): Promise<number> {
    return this.animalRepository.count({where: { status: 'adotado' } });
  }

  /**
   * Calcula o total de animais em processo de adoção.
   * @returns O total de animais em processo de adoção.
   */
  calcTotalInProgress(): Promise<number> {
    return this.animalRepository.count({where: { status: 'em processo' } });
  }

  /**
   * Calcula o total de animais disponíveis para adoção atualmente e há mais de 30 dias.
   * @returns Um objeto contendo o progresso percentual e se é positivo ou negativo.
   */
  async calcTotalAvailablesProgress(): Promise<number> {
    // Data de 30 dias atrás
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

    // Animais disponíveis criados nos últimos 30 dias
    const disponiveisUltimos30Dias = await this.animalRepository.count({
      where: {
        status: 'disponivel',
        createAt: MoreThanOrEqual(date30DaysAgo),
      },
    });

    // Animais disponíveis criados antes de 30 dias atrás
    const disponiveisAntes30Dias = await this.animalRepository.count({
      where: {
        status: 'disponivel',
        createAt: LessThan(date30DaysAgo),
      },
    });

    // Progresso: comparação entre os dois períodos
    const progresso = ((disponiveisUltimos30Dias - disponiveisAntes30Dias) / (disponiveisAntes30Dias || 1)) * 100;

    let tendencia: 'positivo' | 'negativo' | 'estavel';
    if (progresso > 0) tendencia = 'positivo';
    else if (progresso < 0) tendencia = 'negativo';
    else tendencia = 'estavel';

    return progresso;
  }
}
