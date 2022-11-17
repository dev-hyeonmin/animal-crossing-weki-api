import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryColumn } from "typeorm";

@InputType("CreatureInputType", { isAbstract: true })
@ObjectType() // 자동으로 스키마를 빌드하기 위한 GraphQL의 decorator
@Entity() // TypeORM이 DB에 해당 정보 저장
export class Creature {
    @PrimaryColumn()
    @Field(type => String)
    name: string;
}