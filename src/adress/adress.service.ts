import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-adress.dto';
import { AddressRepository } from './adress.repository';
import { Address } from './entities/adress.entity';

@Injectable()
export class AdressService {
  constructor(private readonly addressRepository: AddressRepository) {}
  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const cep = createAddressDto.cep;
    const cepString = cep.toString();

    //this is a just regex to validate test to the cep format
    if (!/^\d{5}-?\d{3}$/.test(cepString)) {
      throw new BadRequestException('Formato de CEP inválido.');
    }

    // Verifica se o CEP já está cadastrado
    const existingAddress = await this.addressRepository.findOne({
      where: { cep },
    });
    if (existingAddress) {
      throw new BadRequestException('Este CEP já está cadastrado.');
    }

    // Cria e salva o endereço
    const newAddress = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(newAddress);
  }

  async getAllAddress(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async getAddressById(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new BadRequestException(`Endereço com o ID ${id} não existe`);
    }
    return address;
  }
  async deleteAddress(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new BadRequestException(`Endereço com o ID ${id} não existe`);
    }
    await this.addressRepository.delete(id);
  }
  async getAddressByCep(cep: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { cep } });
    if (!address) {
      throw new BadRequestException(`Endereço com o CEP ${cep} não existe`);
    }
    return address;
  }

  async deleteAddressByCep(cep: number): Promise<void> {
    const address = await this.addressRepository.findOne({ where: { cep } });
    if (!address) {
      throw new BadRequestException(`Endereço com o CEP ${cep} não existe`);
    }
    await this.addressRepository.delete(address.id);
  }
}
