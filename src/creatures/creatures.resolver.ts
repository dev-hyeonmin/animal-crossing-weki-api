
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateCreatureInput, CreateCreatureOutput, DeleteCreatureInput, DeleteCreatureOutput, UserCreatureOutput } from "./dtos/creature.dto";
import { CreatureService } from "./creatures.service";

@Resolver()
export class CreatureResolver {
    constructor(
        private readonly creatureService: CreatureService
    ) { }

    @Query(returns => UserCreatureOutput)
    async userCreatures(
        @AuthUser() authUser: User,
    ): Promise<UserCreatureOutput> {
        return this.creatureService.userCreatures(authUser.id);
    }

    @Mutation(returns => CreateCreatureOutput)
    async createCreatureRelation(
        @AuthUser() authUser: User,
        @Args('input') createCreatureInput: CreateCreatureInput
    ): Promise<CreateCreatureOutput> {
        return this.creatureService.createCreatureRelation(authUser.id, createCreatureInput);
    }

    @Mutation(returns => DeleteCreatureOutput)
    async deleteCreatureRelation(
        @AuthUser() authUser: User,
        @Args('input') deleteCreatureInput: DeleteCreatureInput
    ): Promise<DeleteCreatureOutput> {
        return this.creatureService.deleteCreatureRelation(authUser.id, deleteCreatureInput);
    }
}