import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repo: Repository<Vehicle>,
  ) {}
  async createVehicle(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.repo.create(dto);
    return this.repo.save(vehicle);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.repo.find();
  }

  async getOneVehicle(filter: {
    id?: number;
    plate?: string;
    chassi_number?: string;
  }): Promise<Vehicle> {
    if (filter.id) {
      return await this.repo.findOneBy({ id: filter.id });
    }

    if (filter.plate) {
      return await this.repo.findOneBy({ vehicle_plate: filter.plate });
    }

    if (filter.chassi_number) {
      return await this.repo.findOneBy({ chassi_number: filter.chassi_number });
    }

    return null;
  }

  async deleteVehicle(filter: { id?: number; plate?: string }): Promise<void> {
    if (filter.id) {
      await this.repo.delete(filter.id);
      return;
    }
    if (filter.plate) {
      await this.repo.delete({ vehicle_plate: filter.plate });
      return;
    }
  }

  async updateVehicle(id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  async findLikeBrand(brand: string): Promise<Vehicle[]> {
    return await this.repo.find({
      where: { brand: Like(`%${brand}%`) },
    });
  }

  async findLikeModel(model: string): Promise<Vehicle[]> {
    return await this.repo.find({
      where: { model: Like(`%${model}%`) },
    });
  }
}
