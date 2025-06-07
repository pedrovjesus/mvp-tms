import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderStatusHistory } from './entity/order_status.entity';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { CustomerModule } from 'src/customer/customer.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { EmployerModule } from 'src/employer/employer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderStatusHistory]),
    EmployerModule,
    CustomerModule,
    VehicleModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository],
})
export class OrderModule {}
