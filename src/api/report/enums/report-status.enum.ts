import {registerEnumType} from '@nestjs/graphql';

export enum ReportStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(ReportStatus, {name: 'ReportStatus'});
