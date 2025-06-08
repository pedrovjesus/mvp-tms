import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';

export class createEmployerDto {
  @ApiProperty({
    description: 'Nome do empregado',
    maxLength: 100,
    example: 'João da Silva',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'CNH do empregado',
    maxLength: 20,
    example: '1234567890',
  })
  @IsNotEmpty({ message: 'A cnh é obrigatório' })
  @MaxLength(20, { message: 'A CNH deve ter no máximo 20 caracteres' })
  cnh: string;

  @ApiProperty({
    description: 'Telefone do empregado',
    maxLength: 15,
    example: '(11) 99999-9999',
  })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone: string;

  @ApiProperty({
    description: 'Email do empregado',
    maxLength: 100,
    example: 'email@exemplo.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @ApiProperty({
    description: 'CPF do empregado',
    maxLength: 14,
    example: '123.456.789-00',
  })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf: string;

  @ApiProperty({
    description: 'Data de nascimento',
    type: String,
    format: 'date',
    example: '1980-01-01',
  })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({
    description: 'Gênero do empregado',
    maxLength: 10,
    example: 'Masculino',
  })
  @IsNotEmpty({ message: 'O gênero é obrigatório' })
  @MaxLength(10, { message: 'O gênero deve ter no máximo 10 caracteres' })
  gender: string;

  @ApiProperty({
    description: 'Cargo do empregado',
    maxLength: 50,
    example: 'Motorista',
  })
  @IsNotEmpty({ message: 'O cargo é obrigatório' })
  @MaxLength(50, { message: 'O cargo deve ter no máximo 50 caracteres' })
  position: string;

  @ApiProperty({
    description: 'Departamento do empregado',
    maxLength: 50,
    example: 'Logística',
  })
  @IsNotEmpty({ message: 'O departamento é obrigatório' })
  @MaxLength(50, { message: 'O departamento deve ter no máximo 50 caracteres' })
  departament: string;

  @ApiProperty({
    description: 'Data de admissão',
    type: String,
    format: 'date',
    example: '2020-01-01',
  })
  @IsNotEmpty({ message: 'A data de admissão é obrigatória' })
  @IsDate()
  @Type(() => Date)
  admissionDate: Date;

  @ApiProperty({
    description: 'Endereço do empregado',
    type: CreateAddressDto,
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({
    description: 'Escala de trabalho',
    example: 'Segunda a sexta, 8h às 18h',
  })
  @IsNotEmpty({ message: 'A escala é obrigatório' })
  workSchedule: string;
}
