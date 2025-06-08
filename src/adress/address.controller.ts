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
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { FindAddressDto } from './dto/find-address.dto';
import { UpdateAddressDto } from './dto/update-adress.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('Endereços')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({
    status: 201,
    description: 'Endereço criado com sucesso.',
    type: Address,
  })
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createAdressDto: CreateAddressDto,
  ): Promise<Address> {
    return this.addressService.createAddress(createAdressDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Buscar um ou mais endereços' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cep', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: [Address],
  })
  async findOne(@Query() query: FindAddressDto): Promise<Address | Address[]> {
    const { id, cep } = query;

    if (!id && !cep) {
      return this.addressService.findAll();
    }

    const idNumber = id ? Number(id) : undefined;
    return this.addressService.findOne({ id: idNumber, cep });
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um endereço pelo ID ou CEP' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cep', required: false, type: String })
  @ApiNoContentResponse({ description: 'Endereço deletado com sucesso.' })
  async delete(
    @Query('id') id?: string,
    @Query('cep') cep?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;
    await this.addressService.delete({ id: idNumber, cep });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar um endereço existente' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({
    status: 200,
    description: 'Endereço atualizado com sucesso.',
    type: Address,
  })
  async update(
    @Query('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new Error('ID inválido');
    }

    return this.addressService.update(idNumber, updateAddressDto);
  }
}
