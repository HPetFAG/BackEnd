import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from './animal.entity';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Animal)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({unique: true})
  document: string;

  @Column()
  profession: string;

  @Column()
  address: string;

  @Column()
  residenceType: string;

  @Column()
  hasYard: boolean;

  @Column()
  hasOtherAnimals: boolean;

  @Column()
  currentlyHasOtherAnimals: boolean;

  @Column()
  hasExperience: boolean;

  @Column()
  reasonToAdopt: string;

  @Column({ default: 'recebido' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
