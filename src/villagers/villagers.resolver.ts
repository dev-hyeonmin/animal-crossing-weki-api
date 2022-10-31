import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateVillagersInput, CreateVillagersOutput, VillagersOutput } from "./dtos/villager.dto";
import { VillagersService } from "./villagers.service";

@Resolver()
export class VillagersResolver {
    constructor(
        private readonly villagersService: VillagersService
    ) { }

    @Query(returns => VillagersOutput)
    async villagers(): Promise<CreateVillagersOutput> {
        return this.villagersService.villagers();
    }

    @Mutation(returns => CreateVillagersOutput)
    async createVillagers(
        @Args('input') createVillagersInput: CreateVillagersInput
    ): Promise<CreateVillagersOutput> {
        return this.villagersService.createVillagers(createVillagersInput);
    }
}