import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.getAllCustomer();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(+id);
  }
}
