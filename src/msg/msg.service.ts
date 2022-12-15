import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMsgDto } from './dto/create-msg.dto';
import { Msg } from './entities/msg.entity';

@Injectable()
export class MsgService {
  constructor(
    // @InjectRepository(Msg)
    private dataSource: DataSource,
  ) {}

  async create(createMsgDto: CreateMsgDto) {
    const result = this.dataSource
      .getRepository(Msg)
      .create({ name: createMsgDto.name, text: createMsgDto.text });
    return await this.dataSource.getRepository(Msg).save(result);
  }

  async findAll() {
    try {
      const result = this.dataSource
        .createQueryBuilder(Msg, 'msg')
        .where({})
        .select(['msg.name', 'msg.text']);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} msg`;
  }

  identify(name: string, clientId: string) {}

  getClientName(clientId: string) {}
}
