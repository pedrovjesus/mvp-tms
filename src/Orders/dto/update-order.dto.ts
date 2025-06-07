import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';
import { CreateOrderDto } from './create-order';

export class UpdateOrderDto extends CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
  @IsOptional()
  @IsString()
  clientName: string;
  @IsOptional()
  @IsString()
  driverName: string;
  @IsOptional()
  @IsString()
  vehiclePlate: string;
  @IsOptional()
  @IsDateString()
  arrivalDate?: string;
  @IsOptional()
  @IsString()
  destination: string;
  @IsOptional()
  @IsString()
  origin: string;
}
