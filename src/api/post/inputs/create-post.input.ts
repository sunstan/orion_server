import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreatePostInput {

    @Field()
    readonly content: string;

    @Field({nullable: true})
    readonly parentId?: number;
}