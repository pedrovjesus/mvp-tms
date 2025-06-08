import { IsOptional, MaxLength, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindCustomerDto {
  @ApiPropertyOptional({ description: 'ID do cliente', type: Number })
  @IsOptional()
  @IsNumberString({}, { message: 'O ID deve ser um número válido' })
  id?: number;

  @ApiPropertyOptional({ maxLength: 14, description: 'CPF ou CNPJ do cliente' })
  @IsOptional()
  @MaxLength(14, { message: 'O CPF/CNPJ deve ter no máximo 14 caracteres' })
  cpfcnpj?: string;

  @ApiPropertyOptional({ maxLength: 100, description: 'Nome do cliente' })
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;
}
