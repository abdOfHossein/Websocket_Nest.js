import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { CreateMsgDto } from './dto/create-msg.dto';
import { MsgService } from './msg.service';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class MsgGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly msgService: MsgService) {}

  @SubscribeMessage('createMsg')
  async create(@MessageBody() createMsgDto: CreateMsgDto) {
    const message=await this.msgService.create(createMsgDto);
    this.server.emit('message',message)
    return `${message.name} ===> ${message.text}`
  }

  @SubscribeMessage('findAllMsg')
  findAll() {
    return this.msgService.findAll();
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('name') name:string,
    @ConnectedSocket() client:Socket
  ) {
    console.log(client.id);
    
    return this.msgService.identify(name,client.id)
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping:boolean, @ConnectedSocket() client:Socket) {

    client.broadcast.emit('typing',{name,isTyping})
  }
}
