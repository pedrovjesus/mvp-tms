// src/typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Vehicle } from './vehicle/entity/vehicle.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Customer, Vehicle],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
});
