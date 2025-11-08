//typeorm  类型映射
import { CommonEntry } from '@/common/entries/common.entry';
import { OrgImage } from '@/modules/orgImage/models/orgImage.entry';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Entity('user')
export class User extends CommonEntry{

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

  @OneToOne(()=>OrgImage,(org)=>org.orgIdForFront)
  avator:OrgImage
}
