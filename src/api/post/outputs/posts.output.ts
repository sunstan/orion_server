import { CursorPaginatedOutput } from '@/core/models/outputs/cursor-paginated.output';
import { ObjectType } from '@nestjs/graphql';
import { Post } from '../post.entity';

@ObjectType()
export class PostsOutput extends CursorPaginatedOutput(Post) {}
