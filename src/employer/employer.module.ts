import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entity/employer.entity';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { EmployerRepository } from './employer.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployerController],
  providers: [
    EmployerService,
    {
      provide: EmployerRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Employer),
      inject: [DataSource],
    },
  ],
})
export class EmployerModule {}
