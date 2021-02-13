import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [MessagingService, OrderService],
})
export class AppModule {}
