import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const DataBaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'llwk20051',
  database: 'hpet_db',
  entities: [path.resolve(__dirname, '..', '../entities', '*.entity.{ts,js}')],
  synchronize: true,
};
