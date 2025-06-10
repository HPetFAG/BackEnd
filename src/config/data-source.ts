import { DataSource } from 'typeorm';
import * as path from 'path';
import { User } from '../entities/user.entity';
import { Animal } from '../entities/animal.entity';
import { Form } from '../entities/form.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'xtz7qr87',
  database: 'hpet_db',
  entities: [User, Animal, Form],
  migrations: [path.resolve(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
});
