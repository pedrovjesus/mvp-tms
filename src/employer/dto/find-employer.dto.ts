import { IsNumber, IsOptional, MaxLength } from 'class-validator';

export class FindEmployerDto {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsOptional()
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf?: string;
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;
}
