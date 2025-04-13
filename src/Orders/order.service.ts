import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order';
import { Order } from './entity/order.entity';
import { OrderRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(orderDto);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAllOrders();
  }

  async getOrderById(id: number): Promise<Order> {
    return this.orderRepository.getOrderById(id);
  }

  async updateOrderStatus(
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<{ message: string }> {
    return await this.orderRepository.updateStatus(updateOrderStatusDto);
  }
}
