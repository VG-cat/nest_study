//typeorm  类型映射
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({
    comment:'昵称',
    default:'',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment:'描述信息',
    default:'',
  })
  desc: string;

  @Column({
    comment:'电话',
    default:'',
  })
  tel: string;

  @Column({
    comment:'密码',
    default:'',
  })
  password: string;

  @Column({
    comment:'账户',
    default:'',
  })
  account: string;
  @Column({
    comment:'验证码',
    nullable:true
  })
  code: string;
  @Column({
    comment:'验证码创建时间',
    nullable:true
  })
  codeCreateTimeAt: Date;
}
