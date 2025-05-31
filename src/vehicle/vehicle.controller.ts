import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FindVehicleDto } from './dto/find-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.createVehicle(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async find(@Query() query: FindVehicleDto): Promise<Vehicle | Vehicle[]> {
    const { id, plate, chassi_number, brand, model } = query;

    if (!id && !plate && !chassi_number && !brand && !model) {
      return this.vehicleService.findAll();
    }
    if (brand) {
      return this.vehicleService.findLikeBrand(brand);
    }
    if (model) {
      return this.vehicleService.findLikeModel(model);
    }

    return this.vehicleService.findOne({
      id: id ? Number(id) : undefined,
      plate: plate,
      chassi_number: chassi_number,
    });
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Query('id') id?: number,
    @Query('plate') plate?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;
    return this.vehicleService.remove({ id: idNumber, plate });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id') id: number,
    @Body(ValidationPipe) dto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const idNumber = Number(id);
    return this.vehicleService.update(idNumber, dto);
  }
}
