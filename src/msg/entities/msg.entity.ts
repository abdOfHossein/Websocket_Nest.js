import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'msg' })
export class Msg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  text: string;
}
