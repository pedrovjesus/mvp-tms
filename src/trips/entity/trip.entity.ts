import { Employer } from 'src/employer/entity/employer.entity';
import { Order } from 'src/Orders/entity/order.entity';
import { Vehicle } from 'src/vehicle/entity/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.trips)
  order: Order;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  vehicle: Vehicle;

  @ManyToOne(() => Employer, (employer) => employer.trips)
  driver: Employer;

  @Column({ type: 'text', nullable: true })
  plannedRoute: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'varchar', length: 50, default: 'pendente' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
