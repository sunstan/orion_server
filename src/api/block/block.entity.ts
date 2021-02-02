import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Field, Int, ObjectType} from '@nestjs/graphql';
import {User} from '@/core/auth/modules/user/user.entity';

@ObjectType()
@Entity({name: 'blocks'})
export class Block {
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
  @ManyToOne(() => User, {eager: true})
  readonly receiver: Promise<User>;

  constructor(item?: Partial<Block>) {
    Object.assign(this, item);
  }
}
