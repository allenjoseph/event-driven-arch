import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { OrderController } from './order.controller';
import { OrderGateway } from './order.gateway';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderGateway, MessagingService, OrderService],
})
export class AppModule {}
