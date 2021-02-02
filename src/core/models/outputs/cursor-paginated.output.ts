import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface EdgeType<T> {
  readonly node: T;
  readonly cursor: string;
}

export interface CursorPaginatedModel<T> {
  readonly edges: EdgeType<T>[];
  readonly nodes: T[];
  readonly hasMore: boolean;
}

export function CursorPaginatedOutput<T>(
  classRef: Type<T>,
): Type<CursorPaginatedModel<T>> {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgesType<T> {
    @Field(() => classRef, { nullable: true })
    readonly node: T;

    @Field(() => String, { nullable: true })
    readonly cursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class CursorPaginatedOutputClass<T> {
    @Field(() => [EdgesType], { nullable: true })
    readonly edges?: EdgesType<T>[];

    @Field(() => [classRef], { nullable: true })
    readonly nodes?: T[];

    @Field(() => Boolean)
    readonly hasMore: boolean;
  }

  return CursorPaginatedOutputClass as any;
}
