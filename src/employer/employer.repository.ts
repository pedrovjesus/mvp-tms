import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entity/employer.entity';
import { createEmployerDto } from './dto/create-employer.dto';
import { updateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerRepository {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(dto: createEmployerDto): Promise<Employer> {
    const employer = this.employerRepository.create(dto);
    return this.employerRepository.save(employer);
  }

  async getAllEmployers(): Promise<Employer[]> {
    return await this.employerRepository.find();
  }
  async getOneEmployer(filter: {
    id?: number;
    cpf?: string;
    name?: string;
  }): Promise<Employer> {
    if (filter.id) {
      return await this.employerRepository.findOneBy({ id: filter.id });
    }

    if (filter.cpf) {
      return await this.employerRepository.findOneBy({ cpf: filter.cpf });
    }

    if (filter.name) {
      return await this.employerRepository.findOneBy({ name: filter.name });
    }

    return null;
  }

  async getEmployerLikeName(name: string): Promise<Employer[]> {
    return await this.employerRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async deleteEmployer(filter: { id?: number; cpf?: string }): Promise<void> {
    if (filter.id) {
      await this.employerRepository.delete(filter.id);
      return;
    }
    if (filter.cpf) {
      await this.employerRepository.delete({ cpf: filter.cpf });
      return;
    }
  }

  async updateEmployer(id: number, dto: updateEmployerDto): Promise<Employer> {
    await this.employerRepository.update(id, dto);
    return this.employerRepository.findOneBy({ id });
  }
}
