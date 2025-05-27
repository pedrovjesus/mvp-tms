import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: CustomerRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Customer),
      inject: [DataSource],
    },
  ],
})
export class CustomerModule {}
