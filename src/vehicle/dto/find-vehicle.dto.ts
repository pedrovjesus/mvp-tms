import { IsOptional } from 'class-validator';

export class FindVehicleDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  plate?: string;
  @IsOptional()
  chassi_number?: string;
  @IsOptional()
  brand?: string;
  @IsOptional()
  model?: string;
}
