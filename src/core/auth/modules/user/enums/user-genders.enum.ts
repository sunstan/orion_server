import {registerEnumType} from '@nestjs/graphql';

export enum UserGenders {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(UserGenders, {name: 'UserGenders'});
