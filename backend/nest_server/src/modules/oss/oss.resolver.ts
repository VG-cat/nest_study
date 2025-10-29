// src/users/users.resolver.ts
import { Resolver, Query, Args, ObjectType, Field, Mutation } from '@nestjs/graphql';
import { OssType } from './dto/oss.type';
import { OSSService } from './oss.service';


@Resolver() 
export class OSSResolver {
  constructor(private readonly ossService:OSSService) {}

  @Query(() => OssType, { description:'查询oss凭证'})
  async getSignature():Promise<OssType> {
    return this.ossService.getSignature();
  }
}