import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const GqlUserAgent = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        GqlExecutionContext.create(ctx).getContext().req.header('user-agent'),
);
