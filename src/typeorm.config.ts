// src/typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Vehicle } from './vehicle/entity/vehicle.entity';
import * as path from 'path';
import { Order } from './orders/entity/order.entity';
import { OrderStatusHistory } from './orders/entity/order_status.entity';
import { Employer } from './employer/entity/employer.entity';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: '10.0.0.184',
  port: 3306,
  username: 'root',
  password: '',
  database: 'base',
  entities: [Customer, Vehicle, Order, OrderStatusHistory, Employer],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
});
