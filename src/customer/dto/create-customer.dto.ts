import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'João da Silva',
    maxLength: 100,
    description: 'Nome completo do cliente',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    example: 'joao@email.com',
    maxLength: 100,
    description: 'Email do cliente',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email: string;

  @ApiProperty({
    example: '11999999999',
    maxLength: 15,
    description: 'Telefone do cliente',
  })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone: string;

  @ApiProperty({
    example: '12345678901',
    maxLength: 14,
    description: 'CPF ou CNPJ do cliente',
  })
  @IsNotEmpty({ message: 'O CPF ou CNPJ é obrigatório' })
  @MaxLength(14, { message: 'O CPF ou CNPJ deve ter no máximo 14 caracteres' })
  cpfCnpj: string;

  @ApiProperty({
    example: 'Pessoa Física',
    maxLength: 20,
    description: 'Tipo de pessoa',
  })
  @IsNotEmpty({ message: 'O tipo de pessoa é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de pessoa deve ter no máximo 20 caracteres',
  })
  personType: string;

  @ApiProperty({
    example: '123456789',
    maxLength: 20,
    description: 'Inscrição estadual',
  })
  @IsNotEmpty({ message: 'A inscrição estadual é obrigatória' })
  @MaxLength(20, {
    message: 'A inscrição estadual deve ter no máximo 20 caracteres',
  })
  stateRegistration: string;

  @ApiProperty({
    example: 'Simples Nacional',
    maxLength: 20,
    description: 'Tipo de contribuição',
  })
  @IsNotEmpty({ message: 'O tipo de contribuição é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de contribuição deve ter no máximo 20 caracteres',
  })
  contributionType: string;

  @ApiProperty({
    example: 'Regime Normal',
    maxLength: 20,
    description: 'Tipo de regime tributário',
  })
  @IsNotEmpty({ message: 'O tipo de regime é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de regime deve ter no máximo 20 caracteres',
  })
  taxRegime: string;

  @ApiProperty({ type: CreateAddressDto, description: 'Endereço do cliente' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({
    example: 'Empresa XYZ',
    maxLength: 100,
    description: 'Nome fantasia',
  })
  @IsNotEmpty({ message: 'O nome fantasia é obrigatório' })
  @MaxLength(100, {
    message: 'O nome fantasia deve ter no máximo 100 caracteres',
  })
  fantasyName: string;
}
