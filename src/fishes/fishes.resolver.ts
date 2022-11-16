
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { CreateFishInput, CreateFishOutput, DeleteFishInput, DeleteFishOutput, UserFishOutput } from "./dtos/fish.dto";
import { FishService } from "./fishes.service";

@Resolver()
export class FishResolver {
    constructor(
        private readonly fishService: FishService
    ) { }

    @Query(returns => UserFishOutput)
    async userFishes(
        @AuthUser() authUser: User,
    ): Promise<UserFishOutput> {
        return this.fishService.userFishes(authUser.id);
    }

    @Mutation(returns => CreateFishOutput)
    async createFishRelation(
        @AuthUser() authUser: User,
        @Args('input') createFishInput: CreateFishInput
    ): Promise<CreateFishOutput> {
        return this.fishService.createFishRelation(authUser.id, createFishInput);
    }

    @Mutation(returns => DeleteFishOutput)
    async deleteFishRelation(
        @AuthUser() authUser: User,
        @Args('input') deleteFishInput: DeleteFishInput
    ): Promise<DeleteFishOutput> {
        return this.fishService.deleteFishRelation(authUser.id, deleteFishInput);
    }
}