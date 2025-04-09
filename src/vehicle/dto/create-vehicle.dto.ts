import { IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'a placa é obrigatório' })
  vehicle_plate: string;
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  model: string;
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  year: number;
  brand: string;
  @IsNotEmpty({ message: 'O chassi é obrigatório' })
  chassi_number: string;
  @IsNotEmpty({ message: 'O renavam é obrigatório' })
  renavam: string;
}
