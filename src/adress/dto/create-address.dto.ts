import { IsNotEmpty, IsNumber, Max, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'O cep é obrigatório' })
  @MaxLength(20, { message: 'O cep deve ter no máximo 20 caracteres' })
  cep: string;

  @IsNotEmpty({ message: 'A rua é obrigatório' })
  @MaxLength(150, { message: 'A rua deve ter no máximo 150 caracteres' })
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  @Max(99999, { message: 'O número deve ter no máximo 5 dígitos' })
  @IsNumber({}, { message: 'O número deve ser um valor numérico' })
  number: number;

  complement?: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @MaxLength(100, { message: 'O bairro deve ter no máximo 100 caracteres' })
  neighborhood: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @MaxLength(50, { message: 'A cidade deve ter no máximo 50 caracteres' })
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @MaxLength(2, { message: 'O estado deve ter no máximo 2 caracteres' })
  uf: string;
}
