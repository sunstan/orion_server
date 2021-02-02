import {registerEnumType} from '@nestjs/graphql';

export enum ReportTypes {
  POST = 'POST',
  PROFILE = 'PROFILE',
  MESSAGE = 'MESSAGE',
}

registerEnumType(ReportTypes, {name: 'ReportTypes'});
