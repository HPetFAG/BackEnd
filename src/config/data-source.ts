import { DataSource } from 'typeorm';
import * as path from 'path';
import { User } from '../entities/user.entity';
import { Animal } from '../entities/animal.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'llwk20051',
  database: 'helppet_db',
  entities: [User, Animal],
  migrations: [path.resolve(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
});
