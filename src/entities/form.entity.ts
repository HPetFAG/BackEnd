import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_animal: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
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

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
