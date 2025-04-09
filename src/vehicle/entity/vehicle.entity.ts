import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
