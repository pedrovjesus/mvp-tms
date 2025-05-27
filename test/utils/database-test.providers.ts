import { DataSource } from 'typeorm';

export const testDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'base_test',
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../src/migrations/*.ts'],
  synchronize: true,
  logging: false,
  dropSchema: true,
});
