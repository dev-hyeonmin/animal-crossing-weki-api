import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@InputType()
@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    @Column(type => Number)
    id: number;

    @CreateDateColumn()
    @Column(type => Date)
    createAt: Date;

    @UpdateDateColumn()
    @Column(type => Date)
    updateAt: Date;
}