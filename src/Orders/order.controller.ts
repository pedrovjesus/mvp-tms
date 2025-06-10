import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import { PdfService } from './utils/pdf.service';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entity/order.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Ordem')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Cria uma nova ordem' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Ordem criada com sucesso',
    type: CreateOrderDto,
  })
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna todas as ordens' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ordens',
    type: [CreateOrderDto],
  })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retorna uma ordem pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da ordem' })
  @ApiResponse({
    status: 200,
    description: 'Ordem encontrada',
    type: CreateOrderDto,
  })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne({ id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Atualiza uma ordem pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da ordem' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: 200,
    description: 'Ordem atualizada',
    type: UpdateOrderDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  @Get(':id/pdf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gera e retorna o PDF da ordem pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da ordem' })
  @ApiResponse({ status: 200, description: 'Retorna um PDF' })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  async getPdf(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const orderEntity = await this.orderService.findOne({ id });

      if (!orderEntity) {
        throw new NotFoundException(' Ordem não encontrada');
      }

      const orderForPdf = {
        id: orderEntity.id,
        origin: orderEntity.origin,
        destination: orderEntity.destination,
        departureDate: orderEntity.departureDate,
        arrivalDate: orderEntity.arrivalDate,
        status: orderEntity.status,
        createdAt: orderEntity.createdAt,
        customer: {
          name: orderEntity.customer?.name || 'Cliente não informado',
          cpfCnpj: orderEntity.customer?.cpfCnpj || '',
          email: orderEntity.customer?.email || '',
          phone: orderEntity.customer?.phone || '',
          address: {
            street: orderEntity.customer?.address?.street || '',
            number: Number(orderEntity.customer?.address?.number) || 0,
            complement: orderEntity.customer?.address?.complement || '',
            neighborhood: orderEntity.customer?.address?.neighborhood || '',
            city: orderEntity.customer?.address?.city || '',
            uf: orderEntity.customer?.address?.uf || '',
            cep: orderEntity.customer?.address?.cep || '',
          },
        },
        vehicle: {
          vehicle_plate: orderEntity.vehicle?.vehicle_plate || '',
          model: orderEntity.vehicle?.model || '',
          brand: orderEntity.vehicle?.brand || '',
          year: orderEntity.vehicle?.year || 0,
          chassi_number: orderEntity.vehicle?.chassi_number || '',
        },
        driver: {
          name: orderEntity.driver?.name || '',
          cpf: orderEntity.driver?.cpf || '',
          phone: orderEntity.driver?.phone || '',
          email: orderEntity.driver?.email || '',
        },
        statusHistory: (orderEntity.statusHistory || []).map((sh) => ({
          date: sh.changedAt,
          status: sh.status,
        })),
      };

      const pdfBuffer = await this.pdfService.generatePdfFromHtml(orderForPdf);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="order.pdf"',
        'Content-Length': pdfBuffer.length,
      });

      return res.end(pdfBuffer);
    } catch (error) {
      console.error('Erro no getPdf:', error);
      throw error;
    }
  }
}
