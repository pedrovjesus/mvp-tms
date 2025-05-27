import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/orders/entity/order.entity';
import { Trip } from 'src/trips/entity/trip.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['vehicle_plate', 'chassi_number', 'renavam'])
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'a placa é obrigatório' })
  vehicle_plate: string;

  @Column()
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  model: string;

  @Column()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  year: number;

  @Column()
  brand: string;

  @Column()
  @IsNotEmpty({ message: 'O chassi é obrigatório' })
  chassi_number: string;

  @Column()
  @IsNotEmpty({ message: 'O renavam é obrigatório' })
  renavam: string;

  @OneToMany(() => Order, (order) => order.vehicle)
  order: Order[];

  @OneToMany(() => Trip, (trip) => trip.vehicleId)
  tripsId: Trip[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
