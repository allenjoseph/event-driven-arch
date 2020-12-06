import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Socket, socket } from 'zeromq';

interface Order {
  uuid?: string;
  dish: string;
  address: string;
  note: string;
}

@Injectable()
export class OrderService {
  private publisher: Socket;
  private puller: Socket;

  private orders: Order[] = [];

  constructor() {
    // Configure Pub Socket
    this.publisher = socket('pub');
    this.publisher.bindSync('tcp://*:5555');
    Logger.log('Publisher bound to port 5555', 'ORDER_SERVICE');

    // Configure Pull Socket
    this.puller = socket('pull');
    this.puller.bindSync('tcp://*:5557');
    Logger.log('Puller connected to port 5557', 'ORDER_SERVICE');
    this.puller.on('message', (msg) => {
      Logger.log(msg.toString(), 'ORDER_SERVICE');
    });
  }

  async createOrder(order: Order): Promise<string> {
    order.uuid = uuidv4();
    this.orders.push(order);
    Logger.log('Order created!', 'ORDER_SERVICE');

    // Publish Domain Event
    this.publishOrderCreatedEvent(order);

    return order.uuid;
  }

  private publishOrderCreatedEvent(order: Order) {
    const topic = 'order_created';
    this.publisher.send([topic, JSON.stringify(order)]);
    Logger.log('Order created event published', 'ORDER_SERVICE');
  }
}
