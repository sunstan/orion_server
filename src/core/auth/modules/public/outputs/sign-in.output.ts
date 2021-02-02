import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType()
export class SignInOutput {
  @Field()
  readonly accessToken: string;

  @Field()
  readonly expiresIn: number;

  @Field(() => User)
  readonly user: User;
}
