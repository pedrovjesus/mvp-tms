import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'O cep é obrigatório' })
  @MaxLength(20, { message: 'O CEP deve ter no máximo 20 caracteres' })
  cep: number;

  @IsNotEmpty({ message: 'A rua é obrigatório' })
  @MaxLength(150, { message: 'A rua deve ter no máximo 150 caracteres' })
  street: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  number: number;

  complement?: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  uf: string;
}
