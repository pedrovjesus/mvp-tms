import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async create(dto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.getOneCustomer({
      cpfcnpj: dto.cpfCnpj,
    });

    if (existingCustomer) {
      throw new BadRequestException(
        `Cliente com CPF/CNPJ ${dto.cpfCnpj} já existe.`,
      );
    }

    return this.customerRepository.createCustomer(dto);
  }
  async findAll(): Promise<Customer[]> {
    try {
      return this.customerRepository.getAllCustomers();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar clientes.' + error.message);
    }
  }

  async findOne(filter: {
    id?: number;
    cpfcnpj?: string;
    name?: string;
  }): Promise<Customer> {
    if (!filter.id && !filter.cpfcnpj) {
      throw new Error('Você deve informar id ou cpfcnpj para busca');
    }

    const customer = await this.customerRepository.getOneCustomer(filter);
    if (!customer) {
      throw new NotFoundException(
        `Cliente não encontrado com os critérios fornecidos.`,
      );
    }
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.getOneCustomer({ id });
    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    const updatedCustomer = Object.assign(customer, dto);
    return this.customerRepository.createCustomer(updatedCustomer);
  }

  async delete(filter: { id?: number; cpfcnpj?: string }): Promise<void> {
    if (!filter.id && !filter.cpfcnpj) {
      throw new Error('Você deve informar id ou cpfcnpj para deletar');
    }
    try {
      await this.customerRepository.deleteCustomer(filter);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao deletar cliente: ${error.message}`,
      );
    }
  }
}
