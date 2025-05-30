import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/adress/dto/create-address.dto';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email: string;
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone: string;
  @IsNotEmpty({ message: 'O CPF ou CNPJ é obrigatório' })
  @MaxLength(14, { message: 'O CPF ou CNPJ deve ter no máximo 14 caracteres' })
  cpfCnpj: string;
  @IsNotEmpty({ message: 'O tipo de pessoa é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de pessoa deve ter no máximo 20 caracteres',
  })
  personType: string;
  @IsNotEmpty({ message: 'A inscrição estadual é obrigatória' })
  @MaxLength(20, {
    message: 'A inscrição estadual deve ter no máximo 20 caracteres',
  })
  stateRegistration: string;
  @IsNotEmpty({ message: 'O tipo de contribuição é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de contribuição deve ter no máximo 20 caracteres',
  })
  contributionType: string;
  @IsNotEmpty({ message: 'O tipo de regime é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de regime deve ter no máximo 20 caracteres',
  })
  taxRegime: string;
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
  @IsNotEmpty({ message: 'O nome fantasia é obrigatório' })
  @MaxLength(100, {
    message: 'O nome fantasia deve ter no máximo 100 caracteres',
  })
  fantasyName: string;
}
