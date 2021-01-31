import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {User} from '@/core/auth/modules/user/user.entity';
import {Post} from '../post/post.entity';

@ObjectType()
@Entity({name: 'likes'})
export class Like {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field(() => User)
    @ManyToOne(() => User, {eager: true})
    readonly emitter: Promise<User>;

    @Field(() => User)
    readonly receiver: Promise<User>;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.likes, {eager: true})
    readonly post: Promise<Post>;

    constructor(item?: Partial<Like>) {
        Object.assign(this, item);
    }
}