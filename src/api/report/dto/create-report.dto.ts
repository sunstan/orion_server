import {ReportTypes} from '../enums/report-types.enum';
import {User} from '@/core/auth/modules/user/user.entity';

export class CreateReportDto {
  readonly referenceId: number;
  readonly type: ReportTypes;
  readonly emitter: User;
}
