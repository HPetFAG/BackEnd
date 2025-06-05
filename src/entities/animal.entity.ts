import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  race: string;

  @Column()
  gender: string;

  @Column()
  species: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  weight: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  height: number;

  @Column({ name: 'physical_description', type: 'text', nullable:true })
  physicalDescription: string;

  @Column({ default: false })
  vaccinated: boolean;

  @Column({ default: false })
  castrated: boolean;

  @Column({ default: false })
  microchipped: boolean;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ default: "disponivel"})
  status:string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
}
