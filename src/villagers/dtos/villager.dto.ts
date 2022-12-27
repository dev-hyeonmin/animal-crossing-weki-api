import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Villager } from "../entities/villager";

@InputType()
export class VillagersInput extends PartialType(
    PickType(Villager, [
        'species',
        'name',
        'personality'
    ])
) {}
    
@ObjectType()
export class VillagersOutput extends CoreOutput{
    @Field(types => [Villager], { nullable: true })
    villagers?: Villager[];

    @Field(types => [String], { nullable: true })
    species?: String[];

    @Field(types => [String], { nullable: true })
    personalities?: String[];
}
    
@ObjectType()
export class VillagersFilterOutput extends CoreOutput{
    @Field(types => [String], { nullable: true })
    species?: String[];

    @Field(types => [String], { nullable: true })
    personalities?: String[];
}

@InputType()
export class CreateVillagersInput extends PickType(Villager, [
    'image',
    'icon',
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