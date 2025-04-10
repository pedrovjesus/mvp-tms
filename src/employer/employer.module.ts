import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entity/employer.entity';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { EmployerRepository } from './employer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployerController],
  providers: [EmployerService, EmployerRepository],
})
export class EmployerModule {}
