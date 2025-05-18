import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entity/trip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripRepository extends Repository<Trip> {
  constructor(
    @InjectRepository(Trip)
    private tripRepo: Repository<Trip>,
  ) {
    super(tripRepo.target, tripRepo.manager, tripRepo.queryRunner);
  }

  async createTrip(trip: Trip): Promise<Trip> {
    const newTrip = this.tripRepo.create(trip);
    return await this.tripRepo.save(newTrip);
  }
  async findTripById(id: number): Promise<Trip> {
    const trip = await this.tripRepo.findOneBy({ id });
    if (!trip) {
      throw new Error('Viagem não encontrada');
    }
    return trip;
  }
  async updateTrip(id: number, trip: Partial<Trip>): Promise<Trip> {
    await this.tripRepo.update(id, trip);
    return this.findTripById(id);
  }
  async deleteTrip(id: number): Promise<void> {
    const trip = await this.findTripById(id);
    await this.tripRepo.remove(trip);
  }
  async findAllTrips(): Promise<Trip[]> {
    return await this.tripRepo.find();
  }
  async findTripsByDriverId(driverId: number): Promise<Trip[]> {
    return await this.tripRepo.find({
      where: { driverId: { id: driverId } },
      relations: ['driverId'], // opcional, se quiser trazer os dados do motorista junto
    });
  }
  async findTripsByVehicleId(vehicleId: number): Promise<Trip[]> {
    return await this.tripRepo.find({
      where: { vehicleId: { id: vehicleId } },
      relations: ['vehicleId'], // opcional, se quiser trazer os dados do veículo junto
    });
  }
}
