import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'A placa é obrigatória' })
  @ApiProperty({ description: 'Placa do veículo', example: 'ABC-1234' })
  vehicle_plate: string;

  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  @ApiProperty({ description: 'Modelo do veículo', example: 'Civic' })
  model: string;

  @IsNotEmpty({ message: 'O ano é obrigatório' })
  @ApiProperty({ description: 'Ano do veículo', example: 2020, type: Number })
  year: number;

  @IsNotEmpty({ message: 'A marca é obrigatória' })
  @ApiProperty({ description: 'Marca do veículo', example: 'Honda' })
  brand: string;

  @IsNotEmpty({ message: 'O chassi é obrigatório' })
  @ApiProperty({
    description: 'Número do chassi',
    example: '9BWZZZ377VT004251',
  })
  chassi_number: string;

  @IsNotEmpty({ message: 'O renavam é obrigatório' })
  @ApiProperty({ description: 'Número do renavam', example: '12345678901' })
  renavam: string;
}
