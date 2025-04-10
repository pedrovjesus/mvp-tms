import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entity/employer.entity';
import { createEmployerDto } from './dto/create-employer.dto';

@Injectable()
export class EmployerRepository extends Repository<Employer> {
  constructor(@InjectRepository(Employer) repository: Repository<Employer>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createEmployer(
    createEmployertDto: createEmployerDto,
  ): Promise<Employer> {
    const {
      name,
      admissionDate,
      birthday,
      cnh,
      cpf,
      departament,
      email,
      gender,
      phone,
      position,
      workSchedule,
    } = createEmployertDto;
    const employer = this.create({
      name,
      admissionDate,
      birthday,
      cnh,
      cpf,
      departament,
      email,
      gender,
      phone,
      position,
      workSchedule,
    });
    return this.save(employer);
  }

  async getAllEmployers(): Promise<Employer[]> {
    return this.find();
  }

  async getEmployerById(id: number): Promise<Employer | undefined> {
    return this.findOne({ where: { id } });
  }

  async deleteEmployer(id: number): Promise<void> {
    await this.delete(id);
  }
}
