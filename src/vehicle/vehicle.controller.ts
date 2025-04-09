import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.createVehicle(createVehicleDto);
  }

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.getAllVehicle();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.getVehicleById(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.vehicleService.deleteVehicle(+id);
  }
}
