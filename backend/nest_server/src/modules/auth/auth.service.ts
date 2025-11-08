import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import dayjs from 'dayjs';
import { Result } from 'src/common/dto/result.type';
import { RESULT_CODE } from 'src/common/constants/code';
import { JwtService } from '@nestjs/jwt';


//发送端验证码
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService:JwtService
    ) {}

    async getAuthCode(tel: string): Promise<Result> {
        //阿里云短信服务
        let code = ''
        for (let i = 0; i < 4; i++) {
            code += Math.floor(Math.random() * 10)
        }

        const user = await this.userService.findByTel(tel)

        if (user) {
            if (dayjs().diff(dayjs(user.codeCreateTimeAt)) <= 60 * 1000) {
                return {
                    code:RESULT_CODE.SUCCESS,
                    message:user.code
                }
            }
            await this.userService.updateCode(user.id, code, new Date())
        } else {
            await this.userService.create({
                tel: tel,
                code: code,
                codeCreateTimeAt: new Date()
            })
        }
        return {
            code:RESULT_CODE.SUCCESS,
            message:code
        }
    }

    async validateCode(tel: string, code: string): Promise<Result> {

        const user = await this.userService.findByTel(tel)
        //不超过一分钟
        if (user && code == user.code && dayjs().diff(dayjs(user.codeCreateTimeAt)) <= 60 * 1000) {
            const token = this.jwtService.sign({
                id:user.id
            })
            return {
                code:RESULT_CODE.SUCCESS,
                message:'验证成功',
                data:token
            };
        }
        return {
            code:RESULT_CODE.FAIL,
            message:'验证失败'
        };
    }
}