import { IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNumber()
  orderId: number;
  @IsNumber()
  vehicleId: number;
  @IsNumber()
  driverId: number;
  @IsString()
  plannedRoute: string;
  startDate: Date;
  endDate: Date;
  @IsString()
  status: string;
  @IsString()
  notes: string;
}
