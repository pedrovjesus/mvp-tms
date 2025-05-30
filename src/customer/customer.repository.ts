import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

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
    return this.repo.find();
  }

  async getOneCustomer(filter: {
    id?: number;
    cpfcnpj?: string;
  }): Promise<Customer | Error> {
    try {
      if (filter.id) {
        const customer = await this.repo.findOneBy({ id: filter.id });
        if (!Customer) {
          throw new Error(`Cliente com ID ${filter.id} não encontrado.`);
        }
        return customer;
      }
      if (filter.cpfcnpj) {
        const customer = await this.repo.findOneBy({ cpfCnpj: filter.cpfcnpj });
        if (!customer) {
          throw new Error(
            `Cliente com CPF/CNPJ ${filter.cpfcnpj} não encontrado.`,
          );
        }
        return customer;
      }
      throw new Error('É necessário informar o id ou o cpfcnpj para busca');
    } catch (error) {
      throw new Error(`Erro ao buscar cliente: ${error.message}`);
    }
  }
}
