import { Field, InputType, ObjectType } from "@nestjs/graphql";


//输出类型
@ObjectType()
export class OssType {
    @Field()
    exprie: string;
    @Field()
    policy: string;
    @Field()
    signature: string;
    @Field()
    accessid: string;
    @Field()
    host: string;
    @Field()
    dir: string;

}
