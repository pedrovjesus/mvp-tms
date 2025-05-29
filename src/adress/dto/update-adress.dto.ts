import { IsOptional, Max, MaxLength } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @MaxLength(20, { message: 'O cep deve ter no máximo 20 caracteres' })
  cep?: string;
  @IsOptional()
  @MaxLength(150, { message: 'A rua deve ter no máximo 150 caracteres' })
  street?: string;
  @IsOptional()
  @Max(99999, { message: 'O número deve ter no máximo 5 dígitos' })
  number?: number;
  @IsOptional()
  @MaxLength(50, { message: 'O complemento deve ter no máximo 50 caracteres' })
  complement?: string;
  @IsOptional()
  @MaxLength(50, { message: 'A cidade deve ter no máximo 50 caracteres' })
  city?: string;
  @IsOptional()
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  uf?: string;
}
