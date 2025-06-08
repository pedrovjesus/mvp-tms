import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSource } from './typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { EmployerModule } from './employer/employer.module';
import { AddressModule } from './adress/address.module';
import { OrderModule } from './orders/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const env = process.env.NODE_ENV === 'test' ? 'test' : 'default';
const dataSource = createDataSource(env);

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    CustomerModule,
    VehicleModule,
    EmployerModule,
    AddressModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
