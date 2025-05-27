import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicles.service';
import { VehicleRepository } from './vehicle.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    {
      provide: VehicleRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
      inject: [DataSource],
    },
  ],
})
export class VehicleModule {}
