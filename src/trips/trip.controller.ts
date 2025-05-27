import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip';
import { Trip } from './entity/trip.entity';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @Post()
  async createTrip(
    @Body(new ValidationPipe()) createTripDto: CreateTripDto,
  ): Promise<Trip | Error> {
    try {
      return await this.tripService.createTrip(createTripDto);
    } catch (error) {
      throw new Error(`Erro ao criar a viagem: ${error.message}`);
    }
  }

  async findAllTrips(): Promise<Trip[]> {
    try {
      return await this.tripService.findAllTrips();
    } catch (error) {
      throw new Error(`Erro ao buscar as viagens: ${error.message}`);
    }
  }

  async findTripById(id: number): Promise<Trip | Error> {
    try {
      return await this.tripService.findTripById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar a viagem com ID ${id}: ${error.message}`);
    }
  }

  async deleteTrip(id: number): Promise<void | Error> {
    try {
      await this.tripService.deleteTrip(id);
    } catch (error) {
      throw new Error(
        `Erro ao deletar a viagem com ID ${id}: ${error.message}`,
      );
    }
  }

  async updateTrip(
    id: number,
    @Body() trip: Partial<Trip>,
  ): Promise<Trip | Error> {
    try {
      return await this.tripService.updateTrip(id, trip);
    } catch (error) {
      throw new Error(
        `Erro ao atualizar a viagem com ID ${id}: ${error.message}`,
      );
    }
  }
}
