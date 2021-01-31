import {InputType} from '@nestjs/graphql';
import {CursorPaginatedInput} from '@/core/models/inputs/cursor-paginated.input';

@InputType()
export class PostsInput extends CursorPaginatedInput {
}