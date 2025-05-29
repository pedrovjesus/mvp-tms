import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressRepository } from './address.repository';
import { Address } from './entities/address.entity';
import { UpdateAddressDto } from './dto/update-adress.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const cepString = String(createAddressDto.cep);

    // Validação de formato de CEP
    if (!/^\d{5}-?\d{3}$/.test(cepString)) {
      throw new BadRequestException('Formato de CEP inválido.');
    }

    console.log('CEP recebido no service:', createAddressDto.cep);
    return this.addressRepository.createAddress(createAddressDto);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepository.getAllAddresses();
  }

  async findOne(filter: { id?: number; cep?: string }): Promise<Address> {
    if (!filter.id && !filter.cep) {
      throw new BadRequestException(
        'Você deve informar o id ou o cep para busca',
      );
    }

    return this.addressRepository.getOneAddress(filter);
  }

  async delete(filter: { id?: number; cep?: string }): Promise<void> {
    if (!filter.id && !filter.cep) {
      throw new BadRequestException(
        'Você deve informar id ou cep para deletar',
      );
    }

    // Vai lançar NotFoundException se não achar
    await this.addressRepository.getOneAddress(filter);

    // Agora apaga
    await this.addressRepository.deleteAddress(filter);
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.getOneAddress({ id });
    Object.assign(address, updateAddressDto);
    return this.addressRepository.createAddress(address);
  }
}
