import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly VehicleRepository: VehicleRepository) {}
  async createVehicle(dto: CreateVehicleDto): Promise<Vehicle> {
    try {
      const vehicle = await this.VehicleRepository.createVehicle(dto);
      return vehicle;
    } catch (error) {
      throw new NotFoundException('Erro ao criar veículo' + error.message);
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return this.VehicleRepository.getAllVehicles();
    } catch (error) {
      throw new NotFoundException('Erro ao buscar veículos: ' + error.message);
    }
  }

  async findOne(filter: {
    id?: number;
    plate?: string;
    chassi_number?: string;
  }): Promise<Vehicle> {
    if (!filter.id && !filter.plate && !filter.chassi_number) {
      throw new NotFoundException(
        'Você deve informar id, plate ou chassi_number para busca',
      );
    }

    const vehicle = await this.VehicleRepository.getOneVehicle(filter);
    if (!vehicle) {
      throw new NotFoundException(
        'Veículo não encontrado com os critérios fornecidos.',
      );
    }
    return vehicle;
  }

  async update(id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.VehicleRepository.getOneVehicle({ id });
    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }
    const updatedVehicle = Object.assign(vehicle, dto);
    return this.VehicleRepository.createVehicle(updatedVehicle);
  }

  async remove(filter: { id?: number; plate?: string }): Promise<void> {
    if (!filter.id && !filter.plate) {
      throw new NotFoundException(
        'Você deve informar id ou plate para exclusão',
      );
    }
    try {
      await this.VehicleRepository.deleteVehicle(filter);
    } catch (error) {
      throw new NotFoundException('Erro ao deletar veículo: ' + error.message);
    }
  }
  async findLikeBrand(brand: string): Promise<Vehicle[]> {
    if (!brand) {
      throw new NotFoundException('Você deve informar uma marca para busca');
    }
    try {
      return this.VehicleRepository.findLikeBrand(brand);
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar veículos por marca: ' + error.message,
      );
    }
  }

  async findLikeModel(model: string): Promise<Vehicle[]> {
    if (!model) {
      throw new NotFoundException('Você deve informar um modelo para busca');
    }
    try {
      return this.VehicleRepository.findLikeModel(model);
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar veículos por modelo: ' + error.message,
      );
    }
  }
}
