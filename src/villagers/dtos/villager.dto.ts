import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Villager } from "../entities/villager";

@InputType()
export class VillagersInput {}

@ObjectType()
export class VillagersOutput extends CoreOutput{
    @Field(types => [Villager], { nullable: true })
    villagers?: Villager[];
}

@InputType()
export class CreateVillagersInput extends PickType(Villager, [
    'image',
    'species',
    'name',
    'personality',
    'gender',
    'birth',
    'speak',
    'speakType',
    'hobby',
    'music',
    'style',
    'style2',
    'color',
    'color2',
    'favoriteTalk',
]) {}

@ObjectType()
export class CreateVillagersOutput extends CoreOutput{ }