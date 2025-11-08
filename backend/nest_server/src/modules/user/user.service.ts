import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { run } from 'node:test';

//用于操作数据库
@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User) // ✅ 注入的是 Repository<User>，不是 UserRepository
      private readonly UserRepository: Repository<User>,
    ) {}

    async create(entity: DeepPartial<User>):Promise<Boolean>{
        const res = await this.UserRepository.insert(entity);
        if(res && res.raw.affectedRows > 0){
            return true;
        }
        return false;
    }

    async del(id:string):Promise<Boolean>{
        const res = await this.UserRepository.delete(id);
        if(res.affected && res.affected > 0){
            return true;
        }
        return false;
    }

    async update(id:string,entity: DeepPartial<User>):Promise<Boolean>{
        const res = await this.UserRepository.update(id,entity);
        if(res.affected && res.affected > 0){
            return true;
        }
        return false;
    }

    async find(id:string):Promise<User>{
        const res = await this.UserRepository.findOne({
            where:{
                id
            }
        });

        if (!res) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return res
    }

    async findByTel(tel:string):Promise<User | null>{
        const res = await this.UserRepository.findOne({
            where:{
                tel
            }
        });

        if (!res) {
            return null;
        }
        return res
    }

    async updateCode(id:string,code:string,codeCreateTimeAt:Date):Promise<Boolean>{
        const res = await this.UserRepository.update(
            id,{code,codeCreateTimeAt}
        );

        if(res.affected && res.affected > 0){
            return true;
        }
        return false;

    }
    //分页
    async findUsers({strat,length}):Promise<[User[],number]>{
        return this.UserRepository.findAndCount({
            take:length,
            skip:strat,
            order:{
                createdAt:'DESC',
            }
        })

    }
}