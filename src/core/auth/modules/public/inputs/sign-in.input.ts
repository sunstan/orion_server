import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class SignInInput {
    @Field()
    readonly email: string;

    @Field()
    readonly password: string;

    @Field(() => Boolean)
    readonly remember: boolean;
}
