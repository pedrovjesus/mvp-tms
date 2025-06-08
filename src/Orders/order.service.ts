import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order';
import { Order } from './entity/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EmployerRepository } from 'src/employer/employer.repository';
import { CustomerRepository } from 'src/customer/customer.repository';
import { VehicleRepository } from 'src/vehicle/vehicle.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly employerRepository: EmployerRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.getOneCustomer({
      name: dto.clientName,
    });
    if (!customer)
      throw new NotFoundException(`Cliente "${dto.clientName}" não encontrado`);

    const vehicle = await this.vehicleRepository.getOneVehicle({
      plate: dto.vehiclePlate,
    });
    if (!vehicle)
      throw new NotFoundException(
        `Veículo "${dto.vehiclePlate}" não encontrado`,
      );

    const driver = await this.employerRepository.getOneEmployer({
      name: dto.driverName,
    });
    if (!driver)
      throw new NotFoundException(
        `Motorista "${dto.driverName}" não encontrado`,
      );

    return this.orderRepository.createWithRelations({
      origin: dto.origin,
      destination: dto.destination,
      departureDate: dto.departureDate,
      arrivalDate: dto.arrivalDate,
      customer,
      vehicle,
      driver,
    });
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.getAllOrder();
    } catch (error) {
      throw new BadRequestException(
        'Erro ao encontrar todas as ordem: ' + error.message,
      );
    }
  }

  async findOne(filter: { id: number }): Promise<Order> {
    if (!filter.id) {
      throw new Error('Você deve informar id para busca');
    }

    const order = await this.orderRepository.getOneOrder(filter);
    if (!order) {
      throw new NotFoundException(
        `Order não encontrado com os critérios fornecidos.`,
      );
    }
    try {
      return order;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao encontrar ordem: ' + error.message,
      );
    }
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    try {
      const updated = await this.orderRepository.updateOrder({ id }, dto);
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Erro ao atualizar ordem: ${error.message}`,
      );
    }
  }
}
