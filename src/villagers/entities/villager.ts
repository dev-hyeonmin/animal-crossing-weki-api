import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { Column, Entity } from "typeorm";

@InputType("VillagerInputType", { isAbstract: true })
@ObjectType()
@Entity()   
export class Villager extends CoreEntity {
    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    image?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    species?: string;

    @Column()
    @Field(type => String)
    name: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    personality?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    gender?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    birth?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    speak?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    speakType?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    hobby?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    music?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    style?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    style2?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    color?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    color2?: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    favoriteTalk?: string;
}