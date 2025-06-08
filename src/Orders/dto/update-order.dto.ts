import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../enum/orderStatus.enum';
import { CreateOrderDto } from './create-order';

export class UpdateOrderDto extends CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiPropertyOptional({ enum: OrderStatus, description: 'Status do pedido' })
  status: OrderStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  clientName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Nome do motorista',
    example: 'Carlos Souza',
  })
  driverName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Placa do veículo', example: 'ABC-1234' })
  vehiclePlate: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Data e hora da chegada',
    example: '2025-06-11T15:00:00Z',
  })
  arrivalDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Destino', example: 'Campinas' })
  destination: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Origem', example: 'São Paulo' })
  origin: string;
}
