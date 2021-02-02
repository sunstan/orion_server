import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class CursorPaginatedInput {
  @Field(() => Int, {defaultValue: 10})
  readonly take: number;

  @Field(() => String, {nullable: true})
  readonly cursor?: string;
}
