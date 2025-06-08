import { IsNumber, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindEmployerDto {
  @ApiPropertyOptional({
    description: 'ID do empregado',
    example: 123,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({
    description: 'CPF do empregado',
    maxLength: 14,
    example: '123.456.789-00',
  })
  @IsOptional()
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf?: string;

  @ApiPropertyOptional({
    description: 'Nome do empregado',
    maxLength: 100,
    example: 'João da Silva',
  })
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;
}
