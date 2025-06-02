import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const DataBaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'xtz7qr87',
  database: 'hpet_db',
  entities: [path.resolve(__dirname, '..', '../entities', '*.entity.{ts,js}')],
  synchronize: true,
};
