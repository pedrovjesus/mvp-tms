import { Address } from 'src/adress/entities/address.entity';
import { Order } from 'src/orders/entity/order.entity';
import { Trip } from 'src/trips/entity/trip.entity';
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
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnh: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  position: string; //criar tabela separada

  @Column()
  departament: string; //criar tabela separada

  @Column({ type: 'date' })
  admissionDate: Date;

  @Column({ nullable: true })
  workSchedule: string; //criar tabela separada

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Order, (order) => order.driver)
  order: Order[];

  @OneToMany(() => Trip, (trip) => trip.driverId)
  tripsId: Trip[];

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
