import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'A placa é obrigatória' })
  @ApiPropertyOptional({ description: 'Placa do veículo', example: 'ABC-1234' })
  vehicle_plate?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  @ApiPropertyOptional({ description: 'Modelo do veículo', example: 'Civic' })
  model?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  @ApiPropertyOptional({
    description: 'Ano do veículo',
    example: 2020,
    type: Number,
  })
  year?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A marca é obrigatória' })
  @ApiPropertyOptional({ description: 'Marca do veículo', example: 'Honda' })
  brand?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O chassi é obrigatório' })
  @ApiPropertyOptional({
    description: 'Número do chassi',
    example: '9BWZZZ377VT004251',
  })
  chassi_number?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O renavam é obrigatório' })
  @ApiPropertyOptional({
    description: 'Número do renavam',
    example: '12345678901',
  })
  renavam?: string;
}
