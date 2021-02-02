import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlCurrentUser } from '@/core/decorators/gql-current-user.decorator';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from '@/core/guards/gql-auth.guard';
import { User } from '@/core/auth/modules/user/user.entity';
import { PostService } from '../post/post.service';
import { LikeService } from './like.service';
import { Like } from './like.entity';

@Resolver(() => Like)
@UseGuards(GqlAuthGuard)
export class LikeResolver {
  constructor(
    readonly likeService: LikeService,
    readonly postService: PostService,
  ) {}

  @Mutation(() => Boolean)
  async toggleLike(
    @GqlCurrentUser() currentUser: User,
    @Args('postId') postId: number,
  ): Promise<boolean> {
    if (!postId) throw new BadRequestException('Post Id is required');

    const post = await this.postService.repository.findOne(postId);
    if (!post) throw new NotFoundException('Post not found');

    const where = { emitter: { id: currentUser.id }, post: { id: postId } };
    const like = await this.likeService.repository.findOne({ where });

    return like
      ? !!(await this.likeService.repository.delete(like.id))
      : !!(await this.likeService.repository.createLike({
          emitter: currentUser,
          post,
        }));
  }

  @ResolveField()
  async receiver(@Parent() parent: Like): Promise<User> {
    const post = await parent.post;
    return await post.author;
  }
}
