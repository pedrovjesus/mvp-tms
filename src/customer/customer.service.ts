import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    /* const existingClient = await this.clientRepository.findOne({ where: { email: createClientDto.email } });
    if (existingClient) {
      throw new BadRequestException('Este e-mail já está cadastrado.');
    } */
    return this.customerRepository.createCustomer(createCustomerDto);
  }

  async getAllCustomer(): Promise<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException(`Cliente com o ID ${id} não existe`);
    }
    return customer;
  }

  async deleteCustomer(id: number): Promise<void> {
    const customer = await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundException(`Cliente com o ID ${id} não existe`);
    }
    await this.customerRepository.deleteCustomer(id);
  }
}
