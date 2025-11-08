import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

//通用装饰器
export const CurUserId = createParamDecorator(
    (_data:unknown,context:ExecutionContext)=>{
        const ctx = GqlExecutionContext.create(context);
        const userId = ctx.getContext().req.user.id;
        return userId;
    }
)