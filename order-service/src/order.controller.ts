import { Body, Controller, Get, Post } from '@nestjs/common';
import { Order, OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Post()
  async createOrder(@Body() createOrderDto: Order): Promise<any> {
    return this.orderService.createOrder(createOrderDto);
  }
}
