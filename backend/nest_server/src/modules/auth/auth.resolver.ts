// src/users/users.resolver.ts
import { Resolver, Query, Args, ObjectType, Field, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Result } from 'src/common/dto/result.type';


@Resolver() 
export class AuthResolver {
  constructor(private readonly authService:AuthService) {}

  @Mutation(() => Result, { description:'获取验证码'})
  async getAuthCode(@Args('tel') tel:string):Promise<Result> {
    return this.authService.getAuthCode(tel);
  }

  @Mutation(() => Boolean, { description:'校验验证码'})
  async validateCode(@Args('tel') tel:string,@Args('code') code:string):Promise<Boolean> {
    return this.authService.validateCode(tel,code);
  }
}