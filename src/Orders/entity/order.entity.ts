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
import { Employer } from 'src/employer/entity/employer.entity';
import { OrderStatus } from '../enum/orderStatus.enum';

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

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDENTE,
  })
  status: OrderStatus;

  @Column()
  origin: string;

  @OneToMany(() => OrderStatusHistory, (status) => status.order)
  statusHistory: OrderStatusHistory[];

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.order)
  vehicle: Vehicle;

  @ManyToOne(() => Customer, (customer) => customer.order)
  customer: Customer;

  @ManyToOne(() => Employer, (employer) => employer.order)
  driver: Employer;

  @CreateDateColumn()
  createdAt: Date;
}
