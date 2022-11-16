import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { Villager } from "./villager";

@InputType("VillagerCommentInputType", { isAbstract: true })
@ObjectType()
@Entity()   
export class VillagerComment extends CoreEntity {
    @Column()
    @Field(type => String)
    content: string;

    @Column()
    @Field(type => Number)
    @RelationId((villagerComment: VillagerComment) => villagerComment.villager)
    villagerId: number;

    @ManyToOne(
        () => Villager,
        (villager) => villager.comments,
        { onDelete: "CASCADE", nullable: false },
    )      
    villager: Villager;

    @ManyToOne(
        () => User,
        (user) => user.comments,
        { onDelete: "CASCADE", nullable: false },
    )
    @Field(type => User, { nullable: true })
    user: User;
}