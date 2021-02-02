import {IsNull, LessThan} from 'typeorm';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {arrayFromCursor, nodesToEdges} from '@/core/utils/cursors';
import {GqlCurrentUser} from '@/core/decorators/gql-current-user.decorator';
import {BadRequestException, NotFoundException, UseGuards} from '@nestjs/common';
import {CreatePostInput} from './inputs/create-post.input';
import {GqlAuthGuard} from '@/core/guards/gql-auth.guard';
import {User} from '@/core/auth/modules/user/user.entity';
import {CreatePostDto} from './dto/create-post.dto';
import {PostsOutput} from './outputs/posts.output';
import {PostsInput} from './inputs/posts.input';
import {PostService} from './post.service';
import {Post} from './post.entity';

@Resolver(() => Post)
@UseGuards(GqlAuthGuard)
export class PostResolver {
    constructor(readonly postService: PostService) {
    }

    @Query(() => PostsOutput)
    async posts(@Args('input') input: PostsInput): Promise<PostsOutput> {
        const {take, cursor} = input;
        const order: any = {id: 'DESC'};
        const where: any = {parent: IsNull()};

        if (cursor) {
            const [id, date] = arrayFromCursor(cursor);
            where.id = LessThan(parseInt(id, 10));
            where.createdAt = LessThan(new Date(date));
        }

        const nodes = await this.postService.repository.find({
            where,
            take,
            order,
        });
        const edges = nodesToEdges(nodes);
        const hasMore = nodes.length >= take;

        return {edges, nodes, hasMore};
    }

    @Mutation(() => Post)
    async createPost(
        @GqlCurrentUser() currentUser: User,
        @Args('input') input: CreatePostInput,
    ): Promise<Post> {
        const {content, parentId} = input;

        if (!content) throw new BadRequestException('Content is required');
        let data: CreatePostDto = {content, author: currentUser};

        if (parentId) {
            const parent = await this.postService.repository.findOne(parentId);
            if (!parent) throw new NotFoundException('Parent not found');
            else data = {...data, parent};
        }

        return await this.postService.repository.createPost(data);
    }
}
