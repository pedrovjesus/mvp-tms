import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepository extends Repository<Address> {
  constructor(repository: Repository<Address>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async createAddress(
    createAddressDto: CreateAddressDto,
    certification: boolean,
  ): Promise<Address | Error> {
    if (!certification) {
      throw new Error('Certificação não encontrada');
    }
    try {
      const { street, city, cep, number, uf, complement } = createAddressDto;
      const address = this.create({
        street,
        city,
        cep,
        number,
        uf,
        complement,
      });
      return this.save(address);
    } catch (error) {
      console.error('Error creating address:', error);
      throw new Error('Failed to create address');
    }
  }

  async getAllAddresses(): Promise<Address[] | Error> {
    try {
      return this.find();
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw new Error('Failed to fetch addresses');
    }
  }

  async getAddressById(id: number): Promise<Address | undefined> {
    try {
      return this.findOne({ where: { id } });
    } catch (error) {
      console.error('Error fetching address by ID:', error);
      throw new Error('Failed to fetch address by ID');
    }
  }

  async deleteAddress(id: number): Promise<void | Error> {
    try {
      await this.delete(id);
    } catch (error) {
      console.error('Error deleting address:', error);
      throw new Error('Failed to delete address');
    }
  }

  async findAddressByCep(cep: number): Promise<Address | undefined> {
    try {
      return this.findOne({ where: { cep } });
    } catch (error) {
      console.error('Error fetching address by CEP:', error);
      throw new Error('Failed to fetch address by CEP');
    }
  }
  async deleteAddressByCep(cep: number): Promise<void | Error> {
    try {
      const address = await this.findAddressByCep(cep);
      if (address) {
        await this.delete(address.id);
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      console.error('Error deleting address by CEP:', error);
      throw new Error('Failed to delete address by CEP');
    }
  }
}
