// src/users/users.resolver.ts
import { Resolver, Query, Args, ObjectType, Field, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Result } from 'src/common/dto/result.type';
import { JwtService } from '@nestjs/jwt';


@Resolver() 
export class AuthResolver {
  constructor(
    private readonly authService:AuthService
  ) {}

  @Mutation(() => Result, { description:'获取验证码'})
  async getAuthCode(@Args('tel') tel:string):Promise<Result> {
    return this.authService.getAuthCode(tel);
  }

  @Mutation(() => Result, { description:'校验验证码'})
  async validateCode(@Args('tel') tel:string,@Args('code') code:string):Promise<Result> {
    return this.authService.validateCode(tel,code);
  }
}