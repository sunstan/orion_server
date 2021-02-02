import { CreateLikeDto } from './dto/create-like.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  createLike = async (data: CreateLikeDto): Promise<Like> => {
    const post = Promise.resolve(data.post);
    const emitter = Promise.resolve(data.emitter);
    const model = new Like({ emitter, post });
    return await this.save(model, { reload: true });
  };
}
