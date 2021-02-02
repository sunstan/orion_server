import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ReportRepository} from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportRepository)
    readonly repository: ReportRepository,
  ) {}
}
