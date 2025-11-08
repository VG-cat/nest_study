// 公共实体类

import { IsDate, IsOptional, validateOrReject } from "class-validator";
import { skip } from "node:test";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class CommonEntry {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        comment:'创建时间',
        type:'timestamp'
    })
    createdAt :Date;

    @Column({
        comment:'创建者',
        nullable:true,
    })
    @IsOptional()
    createdBy :string;

    @Column({
        comment:'修改时间',
        type:'timestamp',
        nullable:true,
    })
    updateAt :Date;

    @Column({
        comment:'修改者',
        nullable:true,
    })
    @IsOptional()
    updateBy :string;

    @Column({
        comment:'删除时间',
        type:'timestamp',
        nullable:true,
    })
    @DeleteDateColumn()
    @IsDate()
    @IsOptional()
    deletedAt :Date;

    @Column({
        comment:'删除者',
        nullable:true,
    })
    @IsOptional()
    deletedBy :string;

    @BeforeInsert()
    setCreatedAt(){
        const now = new Date();
        this.createdAt = now;
        this.updateAt = now;
    }

    @BeforeUpdate()
    setUpdatedAt(){
        const now = new Date();
        this.updateAt = now;
    }

    @BeforeInsert()
    async validateBeforeInsert() {
        await validateOrReject(this)
    }

    @BeforeUpdate()
    async validateBeforeUpdate() {
        await validateOrReject(this,{
            skipMissingProperties:true
        })
    }
}