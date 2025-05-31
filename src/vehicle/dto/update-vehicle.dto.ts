import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'a placa é obrigatório' })
  vehicle_plate?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  model?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  year?: number;
  @IsOptional()
  @IsNotEmpty({ message: 'A marca é obrigatório' })
  brand?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'O chassi é obrigatório' })
  chassi_number?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'O renavam é obrigatório' })
  renavam?: string;
}
