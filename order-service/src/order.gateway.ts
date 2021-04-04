import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrderGateway {
  @WebSocketServer() server: Server;

  emitOrderEvent(payload: any, title: string): void {
    this.server.emit('orderEvents', { title, payload });
  }
}
