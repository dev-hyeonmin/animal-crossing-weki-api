import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Creature } from "../entities/creature.entity";

@ObjectType()
export class UserCreatureOutput extends CoreOutput {
    @Field(types => [Creature], { nullable: true })
    creatures?: Creature[];
}

@InputType()
export class CreateCreatureInput extends PickType(Creature, [
    'name',
]) { }

@ObjectType()
export class CreateCreatureOutput extends CoreOutput { }

@InputType()
export class DeleteCreatureInput extends PickType(Creature, [
    'name',
]) { }

@ObjectType()
export class DeleteCreatureOutput extends CoreOutput { }