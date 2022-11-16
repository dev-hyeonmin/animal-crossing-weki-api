import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { VillagerComment } from "../entities/villager-comment";

@InputType()
export class VillagerCommentsInput extends PickType(VillagerComment, [
    'villagerId'
]){
    @Field(types => Number)
    page: number;
}

@ObjectType()
export class VillagerCommentsOutput extends CoreOutput{
    @Field(types => [VillagerComment], { nullable: true })
    comments?: VillagerComment[];
}

@InputType()
export class CreateVillagerCommentInput extends PickType(VillagerComment, [
    'content',
    'villagerId'
]) {}

@ObjectType()
export class CreateVillagerCommentOutput extends CoreOutput{ }

@InputType()
export class DeleteVillagerCommentInput extends PickType(VillagerComment, [
    'id'
]) {}

@ObjectType()
export class DeleteVillagerCommentOutput extends CoreOutput{}