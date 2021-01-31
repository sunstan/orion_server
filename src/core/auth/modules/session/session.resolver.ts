import {Session} from './session.entity';
import {Resolver} from '@nestjs/graphql';

@Resolver(() => Session)
export class SessionResolver {}