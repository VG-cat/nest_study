//typeorm  类型映射
import { CommonEntry } from '@/common/entries/common.entry';
import { User } from '@/modules/user/models/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Entity('org_image')
export class OrgImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        comment: '地址',
        default: '',
        type: 'text'
    })
    @IsNotEmpty()
    url: string;

    @Column({
        comment: 'remark',
        nullable: true,
    })
    remark: string;

    @OneToOne(()=>User,(user)=>user.avator)
    orgIdForFront:User
}
