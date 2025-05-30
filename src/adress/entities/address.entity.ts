import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  @MaxLength(20, { message: 'O CEP deve ter no maximo 20 caracteres' })
  cep: string;

  @Column()
  @IsNotEmpty({ message: 'O número é obrigatório' })
  @MaxLength(10, { message: 'O número deve ter no maximo 10 caracteres' })
  number: number;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  @IsNotEmpty({ message: 'A rua é obrigatório' })
  @MaxLength(150, { message: 'A rua deve ter no maximo 150 caracteres' })
  street: string;

  @Column()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @MaxLength(100, { message: 'A cidade deve ter no maximo 100 caracteres' })
  city: string;
  @Column()
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @MaxLength(2, { message: 'O estado deve ter no maximo 2 caracteres' })
  uf: string;

  @Column()
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @MaxLength(100, { message: 'O bairro deve ter no maximo 100 caracteres' })
  neighborhood: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
