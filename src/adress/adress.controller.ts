import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-adress.dto';
import { AdressService } from './adress.service';
import { Address } from './entities/adress.entity';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post('/create')
  async create(
    @Body(new ValidationPipe()) createAdressDto: CreateAddressDto,
  ): Promise<Address> {
    return this.adressService.createAddress(createAdressDto);
  }
  @Get()
  async findAll(): Promise<Address[]> {
    return this.adressService.getAllAddress();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address> {
    return this.adressService.getAddressById(+id);
  }
  @Get(':cep')
  async findByCep(@Param('cep') cep: number): Promise<Address> {
    return this.adressService.getAddressByCep(cep);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.adressService.deleteAddress(+id);
  }
  @Delete(':cep')
  async removeByCep(@Param('cep') cep: number): Promise<void> {
    return this.adressService.deleteAddressByCep(cep);
  }
}
