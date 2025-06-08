import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const commonOptions: Partial<DataSourceOptions> = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.HOST_DATABASE,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: false,
};

export function createDataSource(
  env: 'default' | 'test' = 'default',
): DataSource {
  const isTest = env === 'test' || process.env.NODE_ENV === 'test';

  const options: DataSourceOptions = {
    ...commonOptions,
    database: isTest ? 'base_test' : process.env.DATABASE_NAME!,
    synchronize: isTest,
    dropSchema: isTest,
  } as DataSourceOptions;

  return new DataSource(options);
}
