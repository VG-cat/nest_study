import { Field, ObjectType } from "@nestjs/graphql";
import { ClassType, Int } from "type-graphql";

@ObjectType()
export class Page {
    @Field(() => Int)
    total: number;
    @Field(() => Int)
    pageSize: number;
    @Field(() => Int)
    pageNumber: number;
}

interface IResult<T> {
    code: number;
    message: string;
    data?: T;
}


interface IResults<T> {
    code: number;
    message: string;
    data?: T[];
    page?: Page;
}


//类型生成器
export function createResult<T extends object>(ItemType: ClassType<T>): ClassType<IResult<T>> {
    @ObjectType()
    class Result {
        @Field(() => Int)
        code: number;
        @Field(() => String)
        message: string;
        @Field(() => ItemType, { nullable: true })
        data?: T;
    }

    return Result;
}

export function createResults<T extends object>(ItemTypes: ClassType<T>): ClassType<IResults<T>> {
    @ObjectType()
    class Result {
        @Field(() => Int)
        code: number;
        @Field(() => String)
        message: string;
        @Field(() => [ItemTypes], { nullable: true })
        data?: T[];
        @Field(() => Page, { nullable: true })
        page?: Page;
    }

    return Result;
}


@ObjectType()
export class Result {
    @Field(() => Int)
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => String,{nullable:true})
    data?: string;
}

