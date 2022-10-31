import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVillagersInput, CreateVillagersOutput, VillagersInput, VillagersOutput } from "./dtos/villager.dto";
import { Villager } from "./entities/villager";

@Injectable()
export class VillagersService {
    constructor(
        @InjectRepository(Villager)
        private readonly villager: Repository<Villager>,
    ) { }

    async villagers():Promise<VillagersOutput> {
        try {
            const villagers = await this.villager.find();

            return { ok: true, villagers };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async createVillagers(villagerInput: CreateVillagersInput):Promise<CreateVillagersOutput> {
        try {
            const findedVillager = await this.villager.findOne({ where: { name: villagerInput.name } });
            if (findedVillager) { return; }

            await this.villager.save(this.villager.create(villagerInput));

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }
}