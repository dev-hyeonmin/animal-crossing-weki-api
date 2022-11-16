import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@InputType("FishInputType", { isAbstract: true })
@ObjectType() // 자동으로 스키마를 빌드하기 위한 GraphQL의 decorator
@Entity() // TypeORM이 DB에 해당 정보 저장
export class Fish {
    @PrimaryColumn()
    @Field(type => String)
    name: string;
}