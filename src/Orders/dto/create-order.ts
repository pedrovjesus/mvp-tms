import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  clientName: string;

  @IsString()
  vehiclePlate: string;

  @IsString()
  driverName: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDateString()
  departureDate: string;

  @IsOptional()
  @IsDateString()
  arrivalDate?: string;
}
