import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { createEmployerDto } from './dto/create-employer.dto';
import { Employer } from './entity/employer.entity';

@Controller('Employer')
export class EmployerController {
  constructor(private readonly EmployerService: EmployerService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createEmployerDto: createEmployerDto,
  ): Promise<Employer> {
    return this.EmployerService.createEmployer(createEmployerDto);
  }

  @Get()
  async findAll(): Promise<Employer[]> {
    return this.EmployerService.getAllEmployer();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employer> {
    return this.EmployerService.getEmployerById(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.EmployerService.deleteEmployer(+id);
  }
}
