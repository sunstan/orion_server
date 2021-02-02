import {Field, Int, ObjectType} from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {UserRoles} from './enums/user-roles.enum';
import {UserGenders} from '@/core/auth/modules/user/enums/user-genders.enum';

@ObjectType()
@Entity({name: 'users'})
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    @Generated('uuid')
    readonly pid: string;

    @Field(() => UserGenders)
    @Column('enum', {enum: UserGenders})
    readonly gender: UserGenders;

    @Field(() => [UserRoles])
    @Column('set', {enum: UserRoles, default: [UserRoles.STUDENT]})
    readonly roles: UserRoles[];

    @Field()
    @Column()
    readonly email: string;

    @Field()
    @Column()
    readonly password: string;

    @Field()
    @Column()
    readonly lastName: string;

    @Field()
    @Column()
    readonly firstName: string;

    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;

    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    @Field({nullable: true})
    @DeleteDateColumn({nullable: true})
    readonly deletedAt?: Date;

    constructor(item?: Partial<User>) {
        Object.assign(this, item);
    }
}
