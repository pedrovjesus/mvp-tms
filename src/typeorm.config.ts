// src/typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Vehicle } from './vehicle/entity/vehicle.entity';
import * as path from 'path';
import { Order } from './orders/entity/order.entity';
import { OrderStatusHistory } from './orders/entity/order_status.entity';
import { Employer } from './employer/entity/employer.entity';
import { Trip } from './trips/entity/trip.entity';
import { Address } from './adress/entities/address.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'base',
  entities: [
    Customer,
    Vehicle,
    Order,
    OrderStatusHistory,
    Employer,
    Trip,
    Address,
  ],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
});
