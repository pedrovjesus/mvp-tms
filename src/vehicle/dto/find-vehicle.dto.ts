import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindVehicleDto {
  @IsOptional()
  @ApiPropertyOptional({ description: 'ID do veículo', type: Number })
  id?: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Placa do veículo' })
  plate?: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Número do chassi do veículo' })
  chassi_number?: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Marca do veículo' })
  brand?: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Modelo do veículo' })
  model?: string;
}
