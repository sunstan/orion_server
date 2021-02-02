import { Module } from '@nestjs/common';

// INJECT_TEMPLATE_IMPORT
import { ReportModule } from './report/report.module';
import { BlockModule } from './block/block.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // INJECT_TEMPLATE_MODULE
    ReportModule,
    BlockModule,
    LikeModule,
    PostModule,
    ProfileModule,
  ],
})
export class ApiModule {}
