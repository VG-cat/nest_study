// src/users/users.resolver.ts
import { Resolver, Query, Args, ObjectType, Field, Mutation, Context } from '@nestjs/graphql';
import { UserInputType, UserType } from './dto/user.type';; // 你可以自己定义返回类型
import { UserService } from './user.service';
import { GqlAuthGuard } from '@/common/guards/auth.guards';
import { UseGuards } from '@nestjs/common';
import { CurUserId } from '@/common/decorators/current-user.decoator';


@Resolver(() => UserType) // 指定这个 Resolver 返回的是 User 类型
@UseGuards(GqlAuthGuard)  //使用验证守卫
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(()=>Boolean,{description:'新建用户'})
  async create(@Args('params') params:UserInputType):Promise<Boolean>{
    return this.userService.create(params);
  }

  @Query(() => UserType, { nullable: true,description:'使用id 查询用户'})
  async getUserById(@CurUserId() id: string):Promise<UserType> {   //利用装饰器 直接获取id
    return this.userService.find(id);
  }

  @Query(() => UserType, { nullable: true,description:'使用id 查询用户'})
  async getUserInfo(@Context() ctx :any):Promise<UserType> {
    const id = ctx.req.user.id;
    return await this.userService.find(id);
  }
}