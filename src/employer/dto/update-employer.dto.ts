import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';

export class updateEmployerDto {
  @ApiPropertyOptional({
    description: 'Nome do empregado',
    maxLength: 100,
    example: 'João da Silva',
  })
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'CNH do empregado',
    maxLength: 20,
    example: '1234567890',
  })
  @IsOptional()
  @MaxLength(20, { message: 'A CNH deve ter no máximo 20 caracteres' })
  cnh?: string;

  @ApiPropertyOptional({
    description: 'Telefone',
    maxLength: 15,
    example: '(11) 99999-9999',
  })
  @IsOptional()
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Email do empregado',
    maxLength: 100,
    example: 'email@exemplo.com',
  })
  @IsOptional()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'CPF do empregado',
    maxLength: 14,
    example: '123.456.789-00',
  })
  @IsOptional()
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf?: string;

  @ApiPropertyOptional({
    description: 'Data de nascimento',
    type: String,
    format: 'date',
    example: '1980-01-01',
  })
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional({
    description: 'Gênero',
    maxLength: 10,
    example: 'Masculino',
  })
  @IsOptional()
  @MaxLength(10, { message: 'O gênero deve ter no máximo 10 caracteres' })
  gender?: string;

  @ApiPropertyOptional({
    description: 'Cargo',
    maxLength: 50,
    example: 'Motorista',
  })
  @IsOptional()
  @MaxLength(50, { message: 'O cargo deve ter no máximo 50 caracteres' })
  position?: string;

  @ApiPropertyOptional({
    description: 'Departamento',
    maxLength: 50,
    example: 'Logística',
  })
  @IsOptional()
  @MaxLength(50, { message: 'O departamento deve ter no máximo 50 caracteres' })
  departament?: string;

  @ApiPropertyOptional({
    description: 'Data de admissão',
    type: String,
    format: 'date',
    example: '2020-01-01',
  })
  @IsOptional()
  admissionDate?: Date;

  @ApiPropertyOptional({
    description: 'Escala de trabalho',
    maxLength: 100,
    example: 'Segunda a sexta, 8h às 18h',
  })
  @IsOptional()
  @MaxLength(100, { message: 'A escala deve ter no máximo 100 caracteres' })
  workSchedule?: string;

  @ApiPropertyOptional({
    description: 'Se o empregado está ativo',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser um booleano' })
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Endereço',
    type: CreateAddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
