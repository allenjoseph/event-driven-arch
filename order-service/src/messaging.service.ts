import { Injectable, Logger } from '@nestjs/common';
import { Socket, socket } from 'zeromq';

@Injectable()
export class MessagingService {
  bindPubSocket(address: string): Socket {
    const publisher = socket('pub');

    publisher.bindSync(address);
    Logger.log(`Publisher bound to ${address}`, 'ORDER_SERVICE');

    return publisher;
  }

  bindPullSocket(address: string): Socket {
    const puller = socket('pull');

    puller.bindSync(address);
    Logger.log(`Puller connected to ${address}`, 'ORDER_SERVICE');

    return puller;
  }
}
