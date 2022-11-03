import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { Villager } from "./villager";

@InputType("VillagerCommentInputType", { isAbstract: true })
@ObjectType()
@Entity()   
export class VillagerComment extends CoreEntity {
    @Column()
    @Field(type => String)
    content: string;

    @RelationId((villagerComment: VillagerComment) => villagerComment.villager)
    @Field(type => Number)
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
    user: User;
}