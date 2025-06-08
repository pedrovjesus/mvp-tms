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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: Customer,
  })
  async create(
    @Body(ValidationPipe) dto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Buscar um ou mais clientes' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cpfcnpj', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: [Customer],
  })
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
  @ApiOperation({ summary: 'Atualizar um cliente existente' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
    type: Customer,
  })
  async update(
    @Query('id') id: string,
    @Body(ValidationPipe) dto: UpdateCustomerDto,
  ): Promise<Customer> {
    const idNumber = Number(id);
    return this.customerService.update(idNumber, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um cliente pelo ID ou CPF/CNPJ' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cpfcnpj', required: false, type: String })
  @ApiResponse({ status: 204, description: 'Cliente deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Erro ao deletar cliente.' })
  async delete(
    @Query('id') id?: string,
    @Query('cpfcnpj') cpfcnpj?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;

    await this.customerService.delete({ id: idNumber, cpfcnpj });
  }
}
