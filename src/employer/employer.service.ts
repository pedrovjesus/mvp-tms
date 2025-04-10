import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployerRepository } from './employer.repository';
import { createEmployerDto } from './dto/create-employer.dto';
import { Employer } from './entity/employer.entity';

@Injectable()
export class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  async createEmployer(
    createEmployerDto: createEmployerDto,
  ): Promise<Employer> {
    return this.employerRepository.createEmployer(createEmployerDto);
  }

  async getAllEmployer(): Promise<Employer[]> {
    return this.employerRepository.getAllEmployers();
  }

  async getEmployerById(id: number): Promise<Employer> {
    const employer = await this.employerRepository.getEmployerById(id);
    if (!employer) {
      throw new NotFoundException(`Funcionario com o ID ${id} não existe`);
    }
    return employer;
  }

  async deleteEmployer(id: number): Promise<void> {
    const employer = await this.employerRepository.getEmployerById(id);
    if (!employer) {
      throw new NotFoundException(`Funcionario com o ID ${id} não existe`);
    }
    await this.employerRepository.deleteEmployer(id);
  }
}
