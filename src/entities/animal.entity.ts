import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column()
  race: string;

  @Column()
  size: number;

  @Column()
  temperament: string;

  @Column({ type: 'text', array: true })
  historical_health: string[];

  @Column({ type: 'text', array: true })
  special_needs: string[];
}
