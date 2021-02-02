import { ReportStatus } from '../enums/report-status.enum';

export class UpdateReportDto {
  readonly status: ReportStatus;
}
