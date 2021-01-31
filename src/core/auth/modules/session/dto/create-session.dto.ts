import {User} from '../../user/user.entity';

export class CreateSessionDto {
    readonly user: User;
}