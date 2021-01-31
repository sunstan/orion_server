import {encrypt} from '@/core/utils/strings';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GqlCurrentUser} from '@/core/decorators/gql-current-user.decorator';
import {CreateUserInput} from '@/core/auth/modules/user/inputs/create-user.input';
import {BadRequestException, UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '@/core/guards/gql-auth.guard';
import {UserService} from './user.service';
import {User} from './user.entity';

@Resolver(() => User)
export class UserResolver {

    constructor(
        readonly userService: UserService,
    ) {
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    currentUser (@GqlCurrentUser() currentUser: User): User {
        return currentUser;
    }

    @Mutation(() => User)
    async createUser (
        @Args('input') input: CreateUserInput,
    ): Promise<User> {
        if(!input.email) throw new BadRequestException('Email is required');
        if(!input.password) throw new BadRequestException('Password is required');
        if(!input.lastName) throw new BadRequestException('Last Name is required');
        if(!input.firstName) throw new BadRequestException('First Name is required');
        if(!input.birthDate) throw new BadRequestException('Birth Date is required');
        if(!input.gender) throw new BadRequestException('Gender is required');

        const password = await encrypt(input.password);
        return await this.userService.repository.createUser({...input, password});
    }
}