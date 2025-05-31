import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { EmployerModule } from './employer/employer.module';
import { AddressModule } from './adress/address.module';
import { OrderModule } from './orders/order.module';
import { TripModule } from './trips/trip.module';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseName =
  process.env.NODE_ENV === 'test' ? 'base_test' : process.env.DATABASE_NAME;
@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    }),
    CustomerModule,
    VehicleModule,
    EmployerModule,
    AddressModule,
    OrderModule,
    TripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
