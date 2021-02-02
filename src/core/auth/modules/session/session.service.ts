import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SessionRepository} from './session.repository';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    readonly repository: SessionRepository,
  ) {}
}
