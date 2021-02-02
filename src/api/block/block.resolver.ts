import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {GqlCurrentUser} from '@/core/decorators/gql-current-user.decorator';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {UserRoles} from '@/core/auth/modules/user/enums/user-roles.enum';
import {UserService} from '@/core/auth/modules/user/user.service';
import {User} from '@/core/auth/modules/user/user.entity';
import {BlockService} from './block.service';
import {Block} from './block.entity';

@Resolver(() => Block)
export class BlockResolver {
  constructor(
    readonly userService: UserService,
    readonly blockService: BlockService,
  ) {}

  @Mutation(() => Boolean)
  async toggleBlock(
    @GqlCurrentUser() currentUser: User,
    @Args('receiverId') receiverId: number,
  ): Promise<boolean> {
    if (!receiverId) throw new BadRequestException('Receiver Id is required');

    const emitter = currentUser;
    const receiver = await this.userService.repository.findOne(receiverId);
    if (!receiver) throw new NotFoundException('User not found');
    if (receiver.roles.includes(UserRoles.ADMIN)) {
      throw new ForbiddenException('Admin can\'t be blocked');
    }
    if (receiver.roles.includes(UserRoles.TEACHER)) {
      throw new ForbiddenException('Teacher can\'t be blocked');
    }

    const where = {
      emitter: {id: emitter.id},
      receiver: {id: receiver.id},
    };
    const block = await this.blockService.repository.findOne({where});

    return block ?
      !!(await this.blockService.repository.delete(block.id)) :
      !!(await this.blockService.repository.createBlock({
        emitter,
        receiver,
      }));
  }
}
