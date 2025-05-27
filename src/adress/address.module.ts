import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: AddressRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
      inject: [DataSource],
    },
  ],
})
export class AddressModule {}
