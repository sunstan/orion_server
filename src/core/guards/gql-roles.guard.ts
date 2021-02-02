import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRoles} from '../auth/modules/user/enums/user-roles.enum';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class GqlRolesGuard implements CanActivate {
    constructor(readonly reflector: Reflector) {
    }

    canActivate(ctx: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRoles[]>('roles', ctx.getHandler());
        if (!roles) return false;

        const user = GqlExecutionContext.create(ctx).getContext().req.user;
        return user?.roles?.some((role) => roles.includes(role));
    }
}
