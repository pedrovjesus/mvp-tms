import { Type } from 'class-transformer';
import { IsOptional, MaxLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({ maxLength: 14, description: 'CPF ou CNPJ do cliente' })
  @IsOptional()
  @MaxLength(14, { message: 'O CPF/CNPJ deve ter no máximo 14 caracteres' })
  cpfCnpj?: string;

  @ApiPropertyOptional({ maxLength: 100, description: 'Nome do cliente' })
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({ maxLength: 15, description: 'Telefone do cliente' })
  @IsOptional()
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;

  @ApiPropertyOptional({ maxLength: 15, description: 'Celular do cliente' })
  @IsOptional()
  @MaxLength(15, { message: 'O celular deve ter no máximo 15 caracteres' })
  cellPhone?: string;

  @ApiPropertyOptional({
    type: CreateAddressDto,
    description: 'Endereço do cliente',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @ApiPropertyOptional({ maxLength: 20, description: 'Tipo de pessoa' })
  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de pessoa deve ter no máximo 20 caracteres',
  })
  personType?: string;

  @ApiPropertyOptional({ maxLength: 20, description: 'Inscrição estadual' })
  @IsOptional()
  @MaxLength(20, {
    message: 'A inscrição estadual deve ter no máximo 20 caracteres',
  })
  stateRegistration?: string;

  @ApiPropertyOptional({ maxLength: 20, description: 'Tipo de contribuição' })
  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de contribuição deve ter no máximo 20 caracteres',
  })
  contributionType?: string;

  @ApiPropertyOptional({
    maxLength: 20,
    description: 'Tipo de regime tributário',
  })
  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de regime deve ter no máximo 20 caracteres',
  })
  taxRegime?: string;

  @ApiPropertyOptional({ maxLength: 100, description: 'Email do cliente' })
  @IsOptional()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email?: string;

  @ApiPropertyOptional({ maxLength: 20, description: 'Nome fantasia' })
  @IsOptional()
  @MaxLength(20, {
    message: 'O nome fantasia deve ter no máximo 20 caracteres',
  })
  fantasyName?: string;
}
