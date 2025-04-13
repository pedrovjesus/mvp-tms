import { IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';

export class UpdateOrderStatusDto {
  @IsInt()
  orderId: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
