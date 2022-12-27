import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Villager } from "src/villagers/entities/villager";

// favorite villager
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

// my villager
@InputType()
export class RegistMyVillagerInput {
    @Field(type => Number)
    villagerId: number;
}

@ObjectType()
export class RegistMyVillagerOutput extends CoreOutput { }

@ObjectType()
export class MyVillagerOutput extends CoreOutput {
    @Field(type => [Villager])
    myVillagers?: Villager[];
}