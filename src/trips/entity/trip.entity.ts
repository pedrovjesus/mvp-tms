import { Employer } from 'src/employer/entity/employer.entity';
import { Order } from 'src/Orders/entity/order.entity';
import { OrderStatus } from 'src/Orders/enum/orderStatus.enum';
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

  @ManyToOne(() => Order, (order) => order.tripsId)
  orderId: Order;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tripsId)
  vehicleId: Vehicle;

  @ManyToOne(() => Employer, (employer) => employer.tripsId)
  driverId: Employer;

  @Column({ type: 'text', nullable: true })
  plannedRoute: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDENTE })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
