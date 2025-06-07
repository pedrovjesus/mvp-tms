import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { EmployerModule } from './employer/employer.module';
import { AddressModule } from './adress/address.module';
import { OrderModule } from './orders/order.module';
import { TripModule } from './trips/trip.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
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
