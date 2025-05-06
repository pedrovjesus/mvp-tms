import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order';
import { Customer } from 'src/customer/entities/customer.entity';
import { Vehicle } from 'src/vehicle/entity/vehicle.entity';
import { Employer } from 'src/employer/entity/employer.entity';
import { OrderStatusHistory } from './entity/order_status.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enum/orderStatus.enum';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,

    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,

    @InjectRepository(Employer)
    private employerRepo: Repository<Employer>,

    @InjectRepository(OrderStatusHistory)
    private statusRepo: Repository<OrderStatusHistory>,
  ) {
    super(orderRepo.target, orderRepo.manager, orderRepo.queryRunner);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepo.findOneBy({
      name: createOrderDto.clientName,
    });
    const vehicle = await this.vehicleRepo.findOneBy({
      vehicle_plate: createOrderDto.vehiclePlate,
    });

    const driver = await this.employerRepo.findOneBy({
      name: createOrderDto.driverName,
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    } else if (!vehicle) {
      throw new NotFoundException('Veiculo não encontrado');
    } else if (!driver) {
      throw new NotFoundException('Motorista não encontrado');
    }

    const order = this.orderRepo.create({
      customer,
      vehicle,
      driver: driver,
      origin: createOrderDto.origin,
      destination: createOrderDto.destination,
      departureDate: new Date(createOrderDto.departureDate),
      arrivalDate: createOrderDto.arrivalDate
        ? new Date(createOrderDto.arrivalDate)
        : null,
      status: OrderStatus.PENDENTE,
    });

    const savedOrder = this.orderRepo.save(order);
    const initialStatus = this.statusRepo.create({
      order: order,
      status: OrderStatus.PENDENTE,
    });

    await this.statusRepo.save(initialStatus);

    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['customer', 'vehicle', 'employer'],
    });
  }
  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['customer', 'vehicle', 'employer'],
    });
    if (!order) throw new NotFoundException('Ordem não encontrada');
    return order;
  }

  async updateStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOneBy({
      id: updateOrderStatusDto.orderId,
    });

    if (!order) throw new NotFoundException('Ordem não encontrada');

    const newstatus = this.statusRepo.create({
      order,
      status: updateOrderStatusDto.status as OrderStatus,
    });

    await this.statusRepo.save(newstatus);

    order.status = updateOrderStatusDto.status as OrderStatus;
    await this.orderRepo.save(order);

    return { message: 'Status atualizado com sucesso' };
  }
}
