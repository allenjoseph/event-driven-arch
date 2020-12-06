import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

interface CreateOrderDto {
  dish: string;
  address: string;
  note: string;
}

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<string> {
    return this.orderService.createOrder(createOrderDto);
  }
}
