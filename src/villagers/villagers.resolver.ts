import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateVillagersInput, CreateVillagersOutput } from "./dtos/villager.dto";
import { VillagersService } from "./villagers.service";

@Resolver()
export class VillagersResolver {
    constructor(
        private readonly villagersService: VillagersService
    ) { }

    @Mutation(returns => CreateVillagersOutput)
    async createVillagers(
        @Args('input') createVillagersInput: CreateVillagersInput
    ): Promise<CreateVillagersOutput> {
        return this.villagersService.createVillagers(createVillagersInput);
    }
}