import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const GqlResponse = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        GqlExecutionContext.create(ctx).getContext()
            .res,
)