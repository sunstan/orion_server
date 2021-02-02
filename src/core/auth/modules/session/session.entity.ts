import {Field, Int, ObjectType} from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {User} from '../user/user.entity';

@ObjectType()
@Entity({name: 'sessions'})
export class Session {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    @Generated('uuid')
    readonly refreshToken: string;

    @Field(() => Boolean)
    @Column({default: true})
    readonly isValid: boolean;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    @Field(() => User)
    @ManyToOne(() => User)
    readonly user: Promise<User>;

    constructor(item?: Partial<Session>) {
        Object.assign(this, item);
    }
}
