import { Field, InputType, ObjectType } from "@nestjs/graphql";


//输出类型
@ObjectType()
export class UserType {
    @Field()
    id?: string;
    @Field()
    name?: string;
    @Field()
    desc?: string;
    @Field({description:'账户信息'})
    account?: string;
    @Field({description:'验证码'})
    code?: string;
    @Field({description:'验证码'})
    tel?: string;
}

// 输入类型
@InputType()
export class UserInputType {
    @Field()
    name: string;
    @Field()
    desc?: string;
    @Field()
    tel: string;
    @Field()
    password: string;
    @Field({description:'账户信息'})
    account?: string;
}

