import { IsNotEmpty, IsNumber, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    example: '13000-000',
    description: 'Código postal (CEP) do endereço',
    maxLength: 20,
  })
  @IsNotEmpty({ message: 'O cep é obrigatório' })
  @MaxLength(20, { message: 'O cep deve ter no máximo 20 caracteres' })
  cep: string;

  @ApiProperty({
    example: 'Rua das Acácias',
    description: 'Nome da rua',
    maxLength: 150,
  })
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  @MaxLength(150, { message: 'A rua deve ter no máximo 150 caracteres' })
  street: string;

  @ApiProperty({
    example: 123,
    description: 'Número da residência (máximo 5 dígitos)',
    maximum: 99999,
  })
  @IsNotEmpty({ message: 'O número é obrigatório' })
  @Max(99999, { message: 'O número deve ter no máximo 5 dígitos' })
  @IsNumber({}, { message: 'O número deve ser um valor numérico' })
  number: number;

  @ApiPropertyOptional({
    example: 'Apto 21B',
    description: 'Complemento do endereço (opcional)',
  })
  complement?: string;

  @ApiProperty({
    example: 'Centro',
    description: 'Bairro',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @MaxLength(100, { message: 'O bairro deve ter no máximo 100 caracteres' })
  neighborhood: string;

  @ApiProperty({
    example: 'Campinas',
    description: 'Cidade',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @MaxLength(50, { message: 'A cidade deve ter no máximo 50 caracteres' })
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'UF (sigla do estado)',
    maxLength: 2,
  })
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  uf: string;
}
