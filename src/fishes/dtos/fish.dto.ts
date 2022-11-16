import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Fish } from "../entities/fish.entity";

@ObjectType()
export class UserFishOutput extends CoreOutput {
    @Field(types => [Fish], { nullable: true })
    fishes?: Fish[];
}

@InputType()
export class CreateFishInput extends PickType(Fish, [
    'name',
]) { }

@ObjectType()
export class CreateFishOutput extends CoreOutput { }

@InputType()
export class DeleteFishInput extends PickType(Fish, [
    'name',
]) { }

@ObjectType()
export class DeleteFishOutput extends CoreOutput { }