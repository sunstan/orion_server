import { UserRoles } from '../auth/modules/user/enums/user-roles.enum';
import { SetMetadata } from '@nestjs/common';

export const AuthorizedRoles = (...roles: UserRoles[]) =>
  SetMetadata('roles', roles);
