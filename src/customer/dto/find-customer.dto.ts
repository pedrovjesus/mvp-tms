import { IsOptional, MaxLength } from 'class-validator';

export class FindCustomerDto {
  id?: number;

  @IsOptional()
  @MaxLength(14, { message: 'O CPF/CNPJ deve ter no máximo 14 caracteres' })
  cpfcnpj?: string;

  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;
}
