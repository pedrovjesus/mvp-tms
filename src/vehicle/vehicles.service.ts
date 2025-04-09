import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(private readonly VehicleRepository: VehicleRepository) {}

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.VehicleRepository.createVehicle(createVehicleDto);
  }

  async getAllVehicle(): Promise<Vehicle[]> {
    return this.VehicleRepository.getAllVehicles();
  }

  async getVehicleById(id: number): Promise<Vehicle> {
    const vehicle = await this.VehicleRepository.getVehicleById(id);
    if (!vehicle) {
      throw new NotFoundException(`Veiculo com o ID ${id} não existe`);
    }
    return vehicle;
  }

  async deleteVehicle(id: number): Promise<void> {
    const vehicle = await this.VehicleRepository.getVehicleById(id);
    if (!vehicle) {
      throw new NotFoundException(`Cliente com o ID ${id} não existe`);
    }
    await this.VehicleRepository.deleteVehicle(id);
  }
}
