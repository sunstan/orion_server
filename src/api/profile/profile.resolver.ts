import {Resolver} from '@nestjs/graphql';
import {ProfileService} from './profile.service';
import {Profile} from './profile.entity';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(readonly profileService: ProfileService) {}
}
