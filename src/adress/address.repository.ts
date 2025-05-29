import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly repo: Repository<Address>,
  ) {}

  async createAddress(dto: CreateAddressDto): Promise<Address> {
    const address = this.repo.create(dto);
    console.log('CEP recebido no repository:', dto.cep);
    return this.repo.save(address);
  }

  async getAllAddresses(): Promise<Address[]> {
    return this.repo.find();
  }

  async getOneAddress(filter: { id?: number; cep?: string }): Promise<Address> {
    if (filter.id) {
      const address = await this.repo.findOneBy({ id: filter.id });
      if (!address) {
        throw new NotFoundException(
          `Endereço com ID ${filter.id} não encontrado.`,
        );
      }
      return address;
    }

    if (filter.cep) {
      const address = await this.repo.findOneBy({ cep: filter.cep });
      if (!address) {
        throw new NotFoundException(
          `Endereço com CEP ${filter.cep} não encontrado.`,
        );
      }
      return address;
    }

    throw new Error('É necessário informar o id ou o cep para busca');
  }

  async deleteAddress(filter: { id?: number; cep?: string }): Promise<void> {
    if (filter.id) {
      await this.repo.delete(filter.id);
      return;
    }
    if (filter.cep) {
      await this.repo.delete({ cep: filter.cep });
      return;
    }
    throw new Error('Você deve informar id ou cep para deletar');
  }
}
