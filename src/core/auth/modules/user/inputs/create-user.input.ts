import {Field, InputType} from '@nestjs/graphql';
import {UserRoles} from '../enums/user-roles.enum';
import {UserGenders} from '@/core/auth/modules/user/enums/user-genders.enum';

@InputType()
export class CreateUserInput {

    @Field()
    readonly email: string;

    @Field()
    readonly password: string;

    @Field()
    readonly birthDate: Date;

    @Field()
    readonly lastName: string;

    @Field()
    readonly firstName: string;

    @Field(() => UserGenders)
    readonly gender: UserGenders;

    @Field(() => [UserRoles], {nullable: true})
    readonly roles?: UserRoles[];
}