import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const testDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb',
  host: process.env.HOST_DATABASE,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'base_test',
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../src/migrations/*.ts'],
  synchronize: true,
  logging: false,
  dropSchema: true,
});
