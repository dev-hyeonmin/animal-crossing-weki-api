import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Villager } from "src/villagers/entities/villager";

@InputType()
export class RegistFavoriteVillagerInput {
    @Field(type => Number)
    villagerId: number;
}

@ObjectType()
export class RegistFavoriteVillagerOutput extends CoreOutput { }

@ObjectType()
export class MyFavoriteVillagerOutput extends CoreOutput {
    @Field(type => [Villager])
    favoriteVillagers?: Villager[];
}