import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { createEmployerDto } from './dto/create-employer.dto';
import { Employer } from './entity/employer.entity';
import { FindEmployerDto } from './dto/find-employer.dto';
import { updateEmployerDto } from './dto/update-employer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly EmployerService: EmployerService) {}
  @Post()
  async createEmployer(
    @Body(ValidationPipe) dto: createEmployerDto,
  ): Promise<Employer> {
    return this.EmployerService.create(dto);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async find(@Query() query: FindEmployerDto): Promise<Employer | Employer[]> {
    const { id, cpf, name } = query;

    if (name) {
      return this.EmployerService.findLikeName(name);
    }

    if (!id && !cpf && !name) {
      return this.EmployerService.findAll();
    }

    const idNumber = id ? Number(id) : undefined;

    return this.EmployerService.findOne({
      id: idNumber,
      cpf: cpf,
      name: name,
    });
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Query('id') id: string,
    @Query('cpf') cpf: string,
  ): Promise<void> {
    const idNumber = id ? Number(id) : undefined;
    return this.EmployerService.delete({ id: idNumber, cpf: cpf });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Query('id') id: string,
    @Body(ValidationPipe) dto: updateEmployerDto,
  ): Promise<Employer> {
    const idNumber = Number(id);
    return this.EmployerService.update(idNumber, dto);
  }
}
