import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class createEmployerDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;
  @IsNotEmpty({ message: 'A cnh é obrigatório' })
  @MaxLength(20, { message: 'A CNH deve ter no máximo 20 caracteres' })
  cnh: string;
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone: string;
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf: string;
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDate()
  @Type(() => Date)
  birthday: Date;
  @IsNotEmpty({ message: 'O gênero é obrigatório' })
  @MaxLength(10, { message: 'O gênero deve ter no máximo 10 caracteres' })
  gender: string;
  @IsNotEmpty({ message: 'O cargo é obrigatório' })
  @MaxLength(50, { message: 'O cargo deve ter no máximo 50 caracteres' })
  position: string;
  @IsNotEmpty({ message: 'O departamento é obrigatório' })
  @MaxLength(50, { message: 'O departamento deve ter no máximo 50 caracteres' })
  departament: string;
  @IsNotEmpty({ message: 'A data de admissão é obrigatória' })
  @IsDate()
  @Type(() => Date)
  admissionDate: Date;
  @IsNotEmpty({ message: 'A escala é obrigatório' })
  workSchedule: string;
}
