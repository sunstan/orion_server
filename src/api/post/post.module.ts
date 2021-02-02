import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostRepository} from './post.repository';
import {PostResolver} from './post.resolver';
import {PostService} from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository])],
    providers: [PostResolver, PostService],
    exports: [PostService],
})
export class PostModule {}
