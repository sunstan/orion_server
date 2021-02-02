import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {User} from '@/core/auth/modules/user/user.entity';
import {ReportStatus} from './enums/report-status.enum';
import {ReportTypes} from './enums/report-types.enum';

@ObjectType()
@Entity({name: 'reports'})
export class Report {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => ReportStatus)
  @Column('enum', {enum: ReportStatus, default: ReportStatus.PENDING})
  readonly status: ReportStatus;

  @Field(() => ReportTypes)
  @Column('enum', {enum: ReportTypes})
  readonly type: ReportTypes;

  @Field(() => Int)
  @Column()
  readonly referenceId: number;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, {eager: true})
  readonly emitter: Promise<User>;

  constructor(item?: Partial<Report>) {
    Object.assign(this, item);
  }
}
