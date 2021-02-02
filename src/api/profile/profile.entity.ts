import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@/core/auth/modules/user/user.entity';

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  readonly username: string;

  // TODO: Avatar

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  readonly deletedAt?: Date;

  @Field(() => User)
  @ManyToOne(() => User)
  readonly user: Promise<User>;

  constructor(item?: Partial<Profile>) {
    Object.assign(this, item);
  }
}
