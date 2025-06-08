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
  ParseIntPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entity/vehicle.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FindVehicleDto } from './dto/find-vehicle.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo veículo' })
  @ApiResponse({
    status: 201,
    description: 'Veículo criado com sucesso',
    type: Vehicle,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: CreateVehicleDto })
  async create(@Body(ValidationPipe) dto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.createVehicle(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Busca veículos por filtros' })
  @ApiResponse({
    status: 200,
    description: 'Veículos encontrados',
    type: [Vehicle],
  })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'plate', required: false, type: String })
  @ApiQuery({ name: 'chassi_number', required: false, type: String })
  @ApiQuery({ name: 'brand', required: false, type: String })
  @ApiQuery({ name: 'model', required: false, type: String })
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
  @ApiOperation({ summary: 'Deleta um veículo por ID ou placa' })
  @ApiResponse({ status: 204, description: 'Veículo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'plate', required: false, type: String })
  async delete(
    @Query('id', ParseIntPipe) id?: number,
    @Query('plate') plate?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;
    return this.vehicleService.remove({ id: idNumber, plate });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um veículo pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Veículo atualizado com sucesso',
    type: Vehicle,
  })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateVehicleDto })
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const idNumber = Number(id);
    return this.vehicleService.update(idNumber, dto);
  }
}
