import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  createPost = async (data: CreatePostDto): Promise<Post> => {
    const model = new Post(data);
    return await this.save(model, { reload: true });
  };

  updatePost = async (id: number, data: UpdatePostDto): Promise<Post> => {
    return await this.save({ ...data, id }, { reload: true });
  };
}
