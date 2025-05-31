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
    private readonly repo: Repository<Employer>,
  ) {}

  async createEmployer(dto: createEmployerDto): Promise<Employer> {
    const employer = this.repo.create(dto);
    return this.repo.save(employer);
  }

  async getAllEmployers(): Promise<Employer[]> {
    return await this.repo.find();
  }
  async getOneEmployer(filter: {
    id?: number;
    cpf?: string;
    name?: string;
  }): Promise<Employer> {
    if (filter.id) {
      return await this.repo.findOneBy({ id: filter.id });
    }

    if (filter.cpf) {
      return await this.repo.findOneBy({ cpf: filter.cpf });
    }

    if (filter.name) {
      return await this.repo.findOneBy({ name: filter.name });
    }

    return null;
  }

  async getEmployerLikeName(name: string): Promise<Employer[]> {
    return await this.repo.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async deleteEmployer(filter: { id?: number; cpf?: string }): Promise<void> {
    if (filter.id) {
      await this.repo.delete(filter.id);
      return;
    }
    if (filter.cpf) {
      await this.repo.delete({ cpf: filter.cpf });
      return;
    }
  }

  async updateEmployer(id: number, dto: updateEmployerDto): Promise<Employer> {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }
}
