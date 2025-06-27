import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';
import { LessThanOrEqual, LessThan, MoreThanOrEqual } from 'typeorm';

// Data de 30 dias atrás para comparação de progresso
const date30DaysAgo = new Date();
date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
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


  calcTotalInProgress(): Promise<number> {
    return this.animalRepository.count({where: { status: 'em processo' } });
  }

  // Função para calcular o progresso de animais disponíveis nos últimos 30 dias em %, retornando o valor positivo ou negativo.
  async calcTotalAvailablesProgress(): Promise<number> {
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

    return progresso;
  }

  async calcTotalAdoptedProgress(): Promise<number> {
    // Animais adotados criados nos últimos 30 dias
    const adotadosUltimos30Dias = await this.animalRepository.count({
      where: {
        status: 'adotado',
        createAt: MoreThanOrEqual(date30DaysAgo),
      },
    });

    // Animais adotados criados antes de 30 dias atrás
    const adotadosAntes30Dias = await this.animalRepository.count({
      where: {
        status: 'adotado',
        createAt: LessThan(date30DaysAgo),
      },
    });

    // Progresso: comparação entre os dois períodos
    const progresso = ((adotadosUltimos30Dias - adotadosAntes30Dias) / (adotadosAntes30Dias || 1)) * 100;

    return progresso;   
  }

  async calcTotalInProgressProgress(): Promise<number> {
    // Animais em processo criados nos últimos 30 dias
    const emProcessoUltimos30Dias = await this.animalRepository.count({
      where: {
        status: 'em processo',
        createAt: MoreThanOrEqual(date30DaysAgo),
      },
    });

    // Animais em processo criados antes de 30 dias atrás
    const emProcessoAntes30Dias = await this.animalRepository.count({
      where: {
        status: 'em processo',
        createAt: LessThan(date30DaysAgo),
      },
    });

    // Progresso: comparação entre os dois períodos
    const progresso = ((emProcessoUltimos30Dias - emProcessoAntes30Dias) / (emProcessoAntes30Dias || 1)) * 100;

    return progresso;   
  }
}
