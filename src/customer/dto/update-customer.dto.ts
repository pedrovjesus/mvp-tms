import { Type } from 'class-transformer';
import { IsOptional, MaxLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';

export class UpdateCustomerDto {
  @IsOptional()
  @MaxLength(14, { message: 'O CPF/CNPJ deve ter no máximo 14 caracteres' })
  cpfCnpj?: string;

  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @IsOptional()
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;

  @IsOptional()
  @MaxLength(15, { message: 'O celular deve ter no máximo 15 caracteres' })
  cellPhone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de pessoa deve ter no máximo 20 caracteres',
  })
  personType?: string;
  @IsOptional()
  @MaxLength(20, {
    message: 'A inscrição estadual deve ter no máximo 20 caracteres',
  })
  stateRegistration?: string;
  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de contribuição deve ter no máximo 20 caracteres',
  })
  contributionType?: string;
  @IsOptional()
  @MaxLength(20, {
    message: 'O tipo de regime deve ter no máximo 20 caracteres',
  })
  taxRegime?: string;
  @IsOptional()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email?: string;
  @IsOptional()
  @MaxLength(20, {
    message: 'O nome fantasia deve ter no máximo 20 caracteres',
  })
  fantasyName?: string;
}
