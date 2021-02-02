import {CreateReportDto} from './dto/create-report.dto';
import {UpdateReportDto} from './dto/update-report.dto';
import {Repository, EntityRepository} from 'typeorm';
import {Report} from './report.entity';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {
  createReport = async (data: CreateReportDto): Promise<Report> => {
    const emitter = Promise.resolve(data.emitter);
    const model = new Report({...data, emitter});
    return await this.save(model, {reload: true});
  };

  updateReport = async (id: number, data: UpdateReportDto): Promise<Report> => {
    return await this.save({...data, id}, {reload: true});
  };
}
