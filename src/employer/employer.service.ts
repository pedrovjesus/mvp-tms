import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployerRepository } from './employer.repository';
import { createEmployerDto } from './dto/create-employer.dto';
import { Employer } from './entity/employer.entity';
import { updateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}
  async create(dto: createEmployerDto): Promise<Employer> {
    const existingEmployer = await this.employerRepository.getOneEmployer({
      cpf: dto.cpf,
      name: dto.name,
    });
    if (existingEmployer) {
      throw new NotFoundException(
        'Empregador já cadastrado com o CPF ou nome fornecido',
      );
    }
    try {
      const employer = await this.employerRepository.createEmployer(dto);
      return employer;
    } catch (error) {
      throw new NotFoundException('Erro ao criar empregador: ' + error.message);
    }
  }

  async findAll(): Promise<Employer[]> {
    try {
      return await this.employerRepository.getAllEmployers();
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar empregadores: ' + error.message,
      );
    }
  }
  async findOne(filter: {
    id?: number;
    cpf?: string;
    name?: string;
  }): Promise<Employer> {
    try {
      const employer = await this.employerRepository.getOneEmployer(filter);
      if (!employer) {
        throw new NotFoundException('Empregador não encontrado');
      }
      return employer;
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar empregador: ' + error.message,
      );
    }
  }

  async findLikeName(name: string): Promise<Employer[]> {
    try {
      const employers = await this.employerRepository.getEmployerLikeName(name);
      if (employers.length === 0) {
        throw new NotFoundException(
          'Nenhum empregador encontrado com esse nome',
        );
      }
      return employers;
    } catch (error) {
      throw new NotFoundException(
        'Erro ao buscar empregador por nome: ' + error.message,
      );
    }
  }
  async delete(filter: { id?: number; cpf?: string }): Promise<void> {
    if (!filter.id && !filter.cpf) {
      throw new Error('Você deve informar id ou cpfcnpj para deletar');
    }
    try {
      await this.employerRepository.deleteEmployer(filter);
    } catch (error) {
      throw new NotFoundException(
        'Erro ao deletar empregador: ' + error.message,
      );
    }
  }

  async update(id: number, dto: updateEmployerDto): Promise<Employer> {
    try {
      const updatedEmployer = await this.employerRepository.updateEmployer(
        id,
        dto,
      );
      if (!updatedEmployer) {
        throw new NotFoundException('Empregador não encontrado');
      }
      return updatedEmployer;
    } catch (error) {
      throw new NotFoundException(
        'Erro ao atualizar empregador: ' + error.message,
      );
    }
  }
}
