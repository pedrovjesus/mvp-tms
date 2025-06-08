import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { Vehicle } from 'src/vehicle/entity/vehicle.entity';
import { Employer } from 'src/employer/entity/employer.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = this.repo.create(dto);
    return this.repo.save(order);
  }

  async getAllOrder(): Promise<Order[]> {
    return this.repo.find({
      relations: ['customer', 'vehicle', 'driver', 'statusHistory'],
    });
  }

  async getOneOrder(filter: { id: number }): Promise<Order> {
    if (filter.id) {
      return await this.repo.findOne({
        where: { id: filter.id },
        //puxar a relação entre outras tabelas
        relations: ['customer', 'driver', 'vehicle', 'statusHistory'],
      });
    }

    return null;
  }

  async updateOrder(
    filter: { id: number },
    dto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOneOrder(filter);
    const updateOrder = Object.assign(order, dto);
    return this.repo.save(updateOrder);
  }
  async createWithRelations(data: {
    origin: string;
    destination: string;
    departureDate: string;
    arrivalDate?: string;
    customer: Customer;
    vehicle: Vehicle;
    driver: Employer;
  }): Promise<Order> {
    const order = this.repo.create(data);
    return this.repo.save(order);
  }
}
