import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(@InjectRepository(Vehicle) repository: Repository<Vehicle>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const { brand, chassi_number, model, renavam, vehicle_plate, year } =
      createVehicleDto;
    const vehicle = this.create({
      brand,
      chassi_number,
      model,
      renavam,
      vehicle_plate,
      year,
    });
    return this.save(vehicle);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return this.find();
  }

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return this.findOne({ where: { id } });
  }

  async deleteVehicle(id: number): Promise<void> {
    await this.delete(id);
  }
}
