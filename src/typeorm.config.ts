import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseName =
  process.env.NODE_ENV === 'test' ? 'base_test' : process.env.DATABASE_NAME;

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as
    | 'mysql'
    | 'postgres'
    | 'sqlite'
    | 'mariadb',
  host: process.env.HOST_DATABASE,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: databaseName,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});
