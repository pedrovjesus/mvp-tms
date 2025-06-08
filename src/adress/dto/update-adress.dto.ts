import { IsOptional, Max, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiPropertyOptional({
    example: '13000-000',
    description: 'Código postal (CEP) do endereço',
    maxLength: 20,
  })
  @IsOptional()
  @MaxLength(20, { message: 'O cep deve ter no máximo 20 caracteres' })
  cep?: string;

  @ApiPropertyOptional({
    example: 'Rua das Acácias',
    description: 'Nome da rua',
    maxLength: 150,
  })
  @IsOptional()
  @MaxLength(150, { message: 'A rua deve ter no máximo 150 caracteres' })
  street?: string;

  @ApiPropertyOptional({
    example: 123,
    description: 'Número da residência (máximo 5 dígitos)',
    maximum: 99999,
  })
  @IsOptional()
  @Max(99999, { message: 'O número deve ter no máximo 5 dígitos' })
  number?: number;

  @ApiPropertyOptional({
    example: 'Apto 21B',
    description: 'Complemento do endereço (opcional)',
    maxLength: 50,
  })
  @IsOptional()
  @MaxLength(50, { message: 'O complemento deve ter no máximo 50 caracteres' })
  complement?: string;

  @ApiPropertyOptional({
    example: 'Campinas',
    description: 'Cidade',
    maxLength: 50,
  })
  @IsOptional()
  @MaxLength(50, { message: 'A cidade deve ter no máximo 50 caracteres' })
  city?: string;

  @ApiPropertyOptional({
    example: 'SP',
    description: 'UF (sigla do estado)',
    maxLength: 2,
  })
  @IsOptional()
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  uf?: string;
}
