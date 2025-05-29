import { IsOptional, IsNumberString, MinLength } from 'class-validator';

export class FindAddressDto {
  @IsOptional()
  @IsNumberString({}, { message: 'O ID deve ser um número válido' })
  @MinLength(1, { message: 'O ID deve ter pelo menos 1 dígito' })
  id?: string;

  @IsOptional()
  @MinLength(8, { message: 'O cep deve ter pelo menos 8 caractere' })
  cep?: string;
}
