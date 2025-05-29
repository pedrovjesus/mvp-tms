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

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createAdressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      return this.addressService.createAddress(createAdressDto);
    } catch (error) {
      console.error('Error ao criar endereço:', error);
      throw error;
    }
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
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
  async delete(
    @Query('id') id?: string,
    @Query('cep') cep?: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;

    await this.addressService.delete({ id: idNumber, cep });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id') id: string,
    @Body(new ValidationPipe()) updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new Error('ID inválido');
    }

    return this.addressService.update(idNumber, updateAddressDto);
  }
}
