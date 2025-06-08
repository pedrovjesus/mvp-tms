import { IsOptional, IsNumberString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAddressDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'ID do endereço',
    minLength: 1,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O ID deve ser um número válido' })
  @MinLength(1, { message: 'O ID deve ter pelo menos 1 dígito' })
  id?: string;

  @ApiPropertyOptional({
    example: '13000000',
    description: 'Código postal (CEP) do endereço',
    minLength: 8,
  })
  @IsOptional()
  @MinLength(8, { message: 'O cep deve ter pelo menos 8 caractere' })
  cep?: string;
}
