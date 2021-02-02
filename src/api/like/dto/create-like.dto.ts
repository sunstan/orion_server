import { Post } from '../../post/post.entity';
import { User } from '@/core/auth/modules/user/user.entity';

export class CreateLikeDto {
  readonly emitter: User;
  readonly post: Post;
}
