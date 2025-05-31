import { IsBoolean, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class updateEmployerDto {
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;
  @IsOptional()
  @MaxLength(20, { message: 'A CNH deve ter no máximo 20 caracteres' })
  cnh?: string;
  @IsOptional()
  @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
  phone?: string;
  @IsOptional()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email?: string;
  @IsOptional()
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres' })
  cpf?: string;
  @IsOptional()
  birthday?: Date;
  @IsOptional()
  @MaxLength(10, { message: 'O gênero deve ter no máximo 10 caracteres' })
  gender?: string;
  @IsOptional()
  @MaxLength(50, { message: 'O cargo deve ter no máximo 50 caracteres' })
  position?: string;
  @IsOptional()
  @MaxLength(50, { message: 'O departamento deve ter no máximo 50 caracteres' })
  departament?: string;
  @IsOptional()
  admissionDate?: Date;
  @IsOptional()
  @MaxLength(100, { message: 'A escala deve ter no máximo 100 caracteres' })
  workSchedule?: string;
  @IsOptional()
  @IsBoolean({ message: 'O campo ativo deve ser um booleano' })
  active?: boolean;
}
