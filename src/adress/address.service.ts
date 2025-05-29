import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressRepository } from './address.repository';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const cepString = String(createAddressDto.cep);

    // Validação de formato de CEP
    if (!/^\d{5}-?\d{3}$/.test(cepString)) {
      throw new BadRequestException('Formato de CEP inválido.');
    }

    // Verifica se já existe
    try {
      await this.addressRepository.getOneAddress({ cep: cepString });
      // Se não lançar NotFoundException, significa que já existe
      throw new BadRequestException('Este CEP já está cadastrado.');
    } catch (err) {
      if (!(err instanceof NotFoundException)) {
        // Se for outro erro, repassa
        throw err;
      }
      // Se for NotFoundException, continua a criação
    }

    // Cria e persiste
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
}
