// src/users/users.resolver.ts
import { Resolver, Query, Args, ObjectType, Field, Mutation } from '@nestjs/graphql';
import { UserInputType, UserType } from './dto/user.type';; // 你可以自己定义返回类型
import { UserService } from './user.service';


@Resolver(() => UserType) // 指定这个 Resolver 返回的是 User 类型
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(()=>Boolean,{description:'新建用户'})
  async create(@Args('params') params:UserInputType):Promise<Boolean>{
    return this.userService.create(params);
  }

  @Query(() => UserType, { nullable: true,description:'使用id 查询用户'})
  async getUserById(@Args('id', { type: () => String }) id: string):Promise<UserType> {
    return this.userService.find(id);
  }
}