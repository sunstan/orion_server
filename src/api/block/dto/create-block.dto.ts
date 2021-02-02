import {User} from '@/core/auth/modules/user/user.entity';

export class CreateBlockDto {
    readonly emitter: User;
    readonly receiver: User;
}
