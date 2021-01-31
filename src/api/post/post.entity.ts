import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '@/core/auth/modules/user/user.entity';
import {Like} from '../like/like.entity';

@ObjectType()
@Entity({name: 'posts'})
export class Post {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    readonly content: string;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    @Field({nullable: true})
    @DeleteDateColumn({nullable: true})
    readonly deletedAt?: Date;

    @Field(() => User)
    @ManyToOne(() => User)
    readonly author: Promise<User>;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.children, {nullable: true})
    readonly parent: Promise<Post>;

    @Field(() => [Post])
    @ManyToOne(() => Post, post => post.parent, {nullable: true})
    readonly children: Promise<Post[]>;

    @Field(() => [Like])
    @ManyToOne(() => Like, like => like.post, {nullable: true})
    readonly likes: Promise<Like[]>;

    constructor(item?: Partial<Post>) {
        Object.assign(this, item);
    }
}