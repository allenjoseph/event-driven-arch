import { Body, Controller, Post } from '@nestjs/common';
import { Order, OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: Order): Promise<any> {
    return this.orderService.createOrder(createOrderDto);
  }
}
