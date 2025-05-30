import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { FindCustomerDto } from './dto/find-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async find(@Query() query: FindCustomerDto): Promise<Customer | Customer[]> {
    const { id, cpfcnpj, name } = query;

    if (!id && !cpfcnpj && !name) {
      return this.customerService.findAll();
    }

    const idNumber = id ? Number(id) : undefined;

    return this.customerService.findOne({
      id: idNumber,
      cpfcnpj: cpfcnpj,
      name: name,
    });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id') id: string,
    @Body(ValidationPipe) dto: UpdateCustomerDto,
  ): Promise<Customer> {
    const idNumber = Number(id);
    return this.customerService.update(idNumber, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Query('id') id?: string,
    @Query('cpfcnpj') cpfcnpj?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;

    await this.customerService.remove({ id: idNumber, cpfcnpj });
  }
}
