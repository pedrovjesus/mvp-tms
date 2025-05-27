import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entity/trip.entity';
import { TripRepository } from './trip.repository';
import { CreateTripDto } from './dto/create-trip';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: TripRepository,
  ) {}

  async createTrip(createTripDto: CreateTripDto): Promise<Trip | Error> {
    const { orderId, driverId, vehicleId, ...rest } = createTripDto;

    if (!driverId || !vehicleId) {
      throw new Error('Driver and Vehicle IDs are required to create a trip.');
    }

    const trip = {
      ...rest,
      orderId: { id: orderId },
      driverId: { id: driverId },
      vehicleId: { id: vehicleId },
    };

    try {
      return this.tripRepository.createTrip(trip as Partial<Trip>);
    } catch (error) {
      throw new Error(`Erro ao criar a viagem: ${error.message}`);
    }
  }

  async findAllTrips(): Promise<Trip[]> {
    try {
      return this.tripRepository.findAllTrips();
    } catch (error) {
      throw new Error(`Erro ao buscar as viagens: ${error.message}`);
    }
  }

  async findTripById(id: number): Promise<Trip | Error> {
    try {
      return this.tripRepository.findTripById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar a viagem com ID ${id}: ${error.message}`);
    }
  }

  async deleteTrip(id: number): Promise<void | Error> {
    try {
      await this.tripRepository.deleteTrip(id);
    } catch (error) {
      throw new Error(
        `Erro ao deletar a viagem com ID ${id}: ${error.message}`,
      );
    }
  }

  async updateTrip(id: number, trip: Partial<Trip>): Promise<Trip | Error> {
    try {
      return this.tripRepository.updateTrip(id, trip);
    } catch (error) {
      throw new Error(
        `Erro ao atualizar a viagem com ID ${id}: ${error.message}`,
      );
    }
  }
}
