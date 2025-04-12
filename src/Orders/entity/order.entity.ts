import { Customer } from 'src/customer/entities/customer.entity';
import { Vehicle } from 'src/vehicle/entity/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatusHistory } from './order_status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column({ type: 'date' })
  departureDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  arrivalDate: Date;

  @Column({ default: 'pendente' })
  status: 'pendente' | 'em_andamento' | 'finalizado' | 'cancelado';

  @Column()
  origin: string;

  @OneToMany(() => OrderStatusHistory, (status) => status.order)
  statusHistory: OrderStatusHistory[];

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.order)
  vehicle: Vehicle;

  @ManyToOne(() => Customer, (customer) => customer.order)
  client: Customer;

  @CreateDateColumn()
  createdAt: Date;
}
