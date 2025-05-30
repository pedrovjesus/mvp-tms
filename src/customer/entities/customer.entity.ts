import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Address } from 'src/adress/entities/address.entity';
import { Order } from 'src/orders/entity/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no maximo 100 caracteres' })
  name: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(100, { message: 'O email deve ter no maximo 100 caracteres' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @MaxLength(15, { message: 'O telefone deve ter no maximo 15 caracteres' })
  phone: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @Column()
  @IsNotEmpty({ message: 'O CPF ou CNPJ é obrigatório' })
  @MaxLength(11, { message: 'O CPF ou CNPJ é obrigatório ' })
  cpfCnpj: string;

  @Column()
  @IsNotEmpty({ message: 'O tipo de pessoa é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de pessoa deve ter no maximo 20 caracteres',
  })
  personType: string;

  @Column()
  @IsNotEmpty({ message: 'A inscrição estadual é obrigatória' })
  @MaxLength(20, {
    message: 'A inscrição estadual deve ter no maximo 20 caracteres',
  })
  stateRegistration: string;

  @Column()
  @IsNotEmpty({ message: 'O tipo de contribuição é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de contribuição deve ter no maximo 20 caracteres',
  })
  contributionType: string;

  @Column()
  @IsNotEmpty({ message: 'O tipo de regime é obrigatório' })
  @MaxLength(20, {
    message: 'O tipo de regime deve ter no maximo 20 caracteres',
  })
  taxRegime: string;

  @Column()
  @IsNotEmpty({ message: 'O nome fantasia é obrigatório' })
  @MaxLength(100, {
    message: 'O nome fantasia deve ter no maximo 100 caracteres',
  })
  fantasyName: string;

  @OneToMany(() => Order, (order) => order.customer)
  order: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
