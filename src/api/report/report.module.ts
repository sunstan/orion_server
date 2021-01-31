import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';
import { ReportResolver } from './report.resolver';
import { ReportService } from './report.service';
import {ProfileModule} from '../profile/profile.module';
import {PostModule} from '../post/post.module';

@Module({
    imports: [
        forwardRef(() => PostModule),
        forwardRef(() => ProfileModule),
        TypeOrmModule.forFeature([
            ReportRepository,
        ]),
    ],
    providers: [
        ReportResolver,
        ReportService,
    ],
    exports: [
        ReportService,
    ],
})
export class ReportModule {}
