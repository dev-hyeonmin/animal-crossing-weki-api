import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { VillagerComment } from "../entities/villager-comment";

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