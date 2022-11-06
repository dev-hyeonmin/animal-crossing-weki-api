import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/entities/user.entity";
import { CreateVillagerCommentInput, DeleteVillagerCommentInput, DeleteVillagerCommentOutput } from "./dtos/villager-comment.dto";
import { CreateVillagersInput, CreateVillagersOutput, VillagersFilterOutput, VillagersInput, VillagersOutput } from "./dtos/villager.dto";
import { VillagersService } from "./villagers.service";

@Resolver()
export class VillagersResolver {
    constructor(
        private readonly villagersService: VillagersService
    ) { }

    @Query(returns => VillagersOutput)
    async villagers(
        @Args('input') villagersInput: VillagersInput
    ): Promise<CreateVillagersOutput> {
        return this.villagersService.villagers(villagersInput);
    }

    @Query(returns => VillagersFilterOutput)
    async villagersFilter(): Promise<VillagersFilterOutput> {
        return this.villagersService.villagersFilter();
    }


    @Mutation(returns => CreateVillagersOutput)
    async createVillagers(
        @Args('input') createVillagersInput: CreateVillagersInput
    ): Promise<CreateVillagersOutput> {
        return this.villagersService.createVillagers(createVillagersInput);
    }

    @Mutation(returns => CreateVillagersOutput)
    @UseGuards(AuthGuard)
    async createVillagerComment(
        @AuthUser() authUser: User,
        @Args('input') createVillagerCommentInput: CreateVillagerCommentInput
    ): Promise<CreateVillagersOutput> {
        return this.villagersService.createVillagerComment(authUser, createVillagerCommentInput);
    }

    @Mutation(returns => DeleteVillagerCommentOutput)
    @UseGuards(AuthGuard)
    async deleteVillagerComment(
        @AuthUser() authUser: User,
        @Args('input') deleteVillagerCommentInput: DeleteVillagerCommentInput
    ): Promise<DeleteVillagerCommentOutput> {
        return this.villagersService.deleteVillagerComment(authUser.id, deleteVillagerCommentInput);
    }
}