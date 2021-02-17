import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'zeromq';
import { MessagingService } from './messaging.service';

export interface Order {
  uuid: string;
  dish: string;
  address: string;
  note: string;
}

@Injectable()
export class OrderService {
  private publisher: Socket;
  private puller: Socket;

  private orders: Order[] = [];

  constructor(private messaging: MessagingService) {
    this.publisher = this.messaging.bindPubSocket('tcp://*:5555');

    this.puller = this.messaging.bindPullSocket('tcp://*:5557');
    this.puller.on('message', (msg) => {
      Logger.log(msg.toString(), 'ORDER_SERVICE');
    });
  }

  async createOrder(order: Order): Promise<any> {
    this.orders.push(order);
    Logger.log('Order created!', 'ORDER_SERVICE');

    // Publish Domain Event
    this.publishOrderCreatedEvent(order);

    return { status: 'PROCESSING' };
  }

  private publishOrderCreatedEvent(order: Order) {
    const topic = 'order_created';

    this.publisher.send([topic, JSON.stringify(order)]);
    Logger.log('Event OrderCreated published!', 'ORDER_SERVICE');
  }
}
