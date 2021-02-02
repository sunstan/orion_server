import {EntityRepository, Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser = async (data: CreateUserDto): Promise<User> => {
    const model = new User(data);
    return await this.save(model, {reload: true});
  };
}
