import { UserRoles } from '../modules/user/enums/user-roles.enum';

export class AuthPayloadDto {
  readonly id: number;
  readonly email: string;
  readonly roles: UserRoles[];
}
