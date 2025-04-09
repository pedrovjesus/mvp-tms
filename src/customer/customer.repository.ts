import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(@InjectRepository(Customer) repository: Repository<Customer>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createCustomer(
    createCustomertDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { name } = createCustomertDto;
    const customer = this.create({ name });
    return this.save(customer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.find();
  }

  async getCustomerById(id: number): Promise<Customer | undefined> {
    return this.findOne({ where: { id } });
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.delete(id);
  }
}
