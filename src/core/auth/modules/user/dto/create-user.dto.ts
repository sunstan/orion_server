import {UserRoles} from '../enums/user-roles.enum';
import {UserGenders} from '@/core/auth/modules/user/enums/user-genders.enum';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly birthDate: Date;
  readonly gender: UserGenders;
  readonly roles?: UserRoles[];
}
