import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {Injectable} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    readonly repository: UserRepository,
  ) {}
}
