// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Customer],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
