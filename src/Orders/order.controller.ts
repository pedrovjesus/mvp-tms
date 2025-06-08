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

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pdfService: PdfService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne({ id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  @Get(':id/pdf')
  async getPdf(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      // Buscar a ordem completa no service
      const orderEntity = await this.orderService.findOne({ id });

      if (!orderEntity) {
        throw new NotFoundException('Order not found');
      }

      const orderForPdf = {
        //mapeia a ordem
        id: orderEntity.id,
        origin: orderEntity.origin,
        destination: orderEntity.destination,
        departureDate: orderEntity.departureDate,
        arrivalDate: orderEntity.arrivalDate,
        status: orderEntity.status,
        createdAt: orderEntity.createdAt,
        customer: {
          name: orderEntity.customer?.name || 'Cliente não informado',
        },
        vehicle: {
          plate: orderEntity.vehicle?.vehicle_plate || 'Placa não informada',
        },
        driver: {
          name: orderEntity.driver?.name || 'Motorista não informado',
        },
        statusHistory: (orderEntity.statusHistory || []).map((sh) => ({
          date: sh.changedAt,
          status: sh.status,
        })),
      };

      // Chamar o serviço que gera o PDF a partir do objeto acima
      const pdfBuffer = await this.pdfService.generatePdfFromHtml(orderForPdf);

      // Configurar o cabeçalho da resposta para download do PDF
      res.set({
        'Content-Type': 'application/pdf',
        //inline para abrir uma pagina ao inves de solicitar download
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
