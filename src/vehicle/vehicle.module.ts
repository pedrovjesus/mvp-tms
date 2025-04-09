import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicles.service';
import { VehicleRepository } from './vehicle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
