import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({ description: 'Nome do cliente', example: 'João Silva' })
  clientName: string;

  @IsString()
  @ApiProperty({ description: 'Placa do veículo', example: 'ABC-1234' })
  vehiclePlate: string;

  @IsString()
  @ApiProperty({ description: 'Nome do motorista', example: 'Carlos Souza' })
  driverName: string;

  @IsString()
  @ApiProperty({ description: 'Local de origem', example: 'São Paulo' })
  origin: string;

  @IsString()
  @ApiProperty({ description: 'Local de destino', example: 'Campinas' })
  destination: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data e hora da saída',
    example: '2025-06-10T08:30:00Z',
  })
  departureDate: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Data e hora da chegada (opcional)',
    example: '2025-06-11T15:00:00Z',
  })
  arrivalDate?: string;
}
