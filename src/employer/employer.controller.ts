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
  ParseIntPipe,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { createEmployerDto } from './dto/create-employer.dto';
import { Employer } from './entity/employer.entity';
import { FindEmployerDto } from './dto/find-employer.dto';
import { updateEmployerDto } from './dto/update-employer.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('employer')
@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo empregado' })
  @ApiResponse({
    status: 201,
    description: 'Empregado criado com sucesso',
    type: Employer,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiBody({ type: createEmployerDto })
  async createEmployer(
    @Body(ValidationPipe) dto: createEmployerDto,
  ): Promise<Employer> {
    return this.employerService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Busca empregados por filtros' })
  @ApiResponse({
    status: 200,
    description: 'Empregados encontrados',
    type: [Employer],
  })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'name', required: false, type: String })
  async find(@Query() query: FindEmployerDto): Promise<Employer | Employer[]> {
    const { id, cpf, name } = query;

    if (name) {
      return this.employerService.findLikeName(name);
    }

    if (!id && !cpf && !name) {
      return this.employerService.findAll();
    }

    const idNumber = id ? Number(id) : undefined;

    return this.employerService.findOne({
      id: idNumber,
      cpf: cpf,
      name: name,
    });
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um empregado por ID ou CPF' })
  @ApiResponse({ status: 204, description: 'Empregado deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Empregado não encontrado' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  async delete(
    @Query('id', ParseIntPipe) id?: number,
    @Query('cpf') cpf?: string,
  ): Promise<void> {
    await this.employerService.delete({ id, cpf });
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um empregado pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Empregado atualizado com sucesso',
    type: Employer,
  })
  @ApiResponse({ status: 404, description: 'Empregado não encontrado' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiBody({ type: updateEmployerDto })
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: updateEmployerDto,
  ): Promise<Employer> {
    return this.employerService.update(id, dto);
  }
}
