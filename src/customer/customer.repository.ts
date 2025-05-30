import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.repo.create(dto);
    return this.repo.save(customer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this.repo.find({
      relations: ['address'],
    });
  }

  async getOneCustomer(filter: {
    id?: number;
    cpfcnpj?: string;
    name?: string;
  }): Promise<Customer> {
    if (filter.id) {
      return await this.repo.findOneBy({ id: filter.id });
    }

    if (filter.cpfcnpj) {
      return await this.repo.findOneBy({ cpfCnpj: filter.cpfcnpj });
    }

    if (filter.name) {
      return await this.repo.findOneBy({ name: filter.name });
    }

    return null;
  }

  async deleteCustomer(filter: {
    id?: number;
    cpfcnpj?: string;
  }): Promise<void> {
    if (filter.id) {
      await this.repo.delete(filter.id);
      return;
    }
    if (filter.cpfcnpj) {
      await this.repo.delete({ cpfCnpj: filter.cpfcnpj });
      return;
    }
  }

  async updateCustomer(
    filter: { id?: number; cpfcnpj?: string },
    dto: UpdateCustomerDto,
  ): Promise<Customer | Error> {
    const customer = await this.getOneCustomer(filter);
    const updatedCustomer = Object.assign(customer, dto);
    return this.repo.save(updatedCustomer);
  }
}
