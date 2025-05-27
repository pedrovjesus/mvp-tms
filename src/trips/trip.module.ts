import { Module } from '@nestjs/common';
import { Trip } from './entity/trip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripController],
  providers: [
    TripService,
    {
      provide: TripRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Trip),
      inject: [DataSource],
    },
  ],
})
export class TripModule {}
