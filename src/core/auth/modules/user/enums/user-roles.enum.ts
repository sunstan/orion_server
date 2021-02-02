import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

registerEnumType(UserRoles, { name: 'UserRoles' });
