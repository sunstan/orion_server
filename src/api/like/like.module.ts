import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LikeRepository} from './like.repository';
import {LikeResolver} from './like.resolver';
import {LikeService} from './like.service';
import {PostModule} from '../post/post.module';

@Module({
  imports: [
    forwardRef(() => PostModule),
    TypeOrmModule.forFeature([LikeRepository]),
  ],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
