import { Module } from '@nestjs/common';
import { MsgService } from './msg.service';
import { MsgGateway } from './msg.gateway';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Msg } from './entities/msg.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Msg])],
  providers: [MsgGateway, MsgService]
})
export class MsgModule {}
