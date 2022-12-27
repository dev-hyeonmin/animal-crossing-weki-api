import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "aws-sdk/clients/budgets";
import { Like, Repository } from "typeorm";
import { CreateVillagerCommentInput, CreateVillagerCommentOutput, DeleteVillagerCommentInput, DeleteVillagerCommentOutput, VillagerCommentsInput, VillagerCommentsOutput } from "./dtos/villager-comment.dto";
import { CreateVillagersInput, CreateVillagersOutput, VillagersFilterOutput, VillagersInput, VillagersOutput } from "./dtos/villager.dto";
import { Villager } from "./entities/villager";
import { VillagerComment } from "./entities/villager-comment";

@Injectable()
export class VillagersService {
    constructor(
        @InjectRepository(Villager)
        private readonly villager: Repository<Villager>,
        @InjectRepository(VillagerComment)
        private readonly villagerComment: Repository<VillagerComment>,
    ) { }

    async villagers({ name, species, personality }: VillagersInput): Promise<VillagersOutput> {
        try {
            let whereSql = {};
            if (name) {
                whereSql = {...whereSql, ...{name: Like(`%${name}%`)}};
            }

            if (species) {
                whereSql = {...whereSql, ...{species: species}};
            }

            if (personality) {
                whereSql = {...whereSql, ...{personality: personality}};
            }

            const villagers = await this.villager.find({ where: whereSql });

            return {
                ok: true,
                villagers,
            };
        } catch (error) {
            console.log(error);
            return { ok: false, error };
        }
    }

    async villagersFilter(): Promise<VillagersFilterOutput> {
        try {
            const species = [];
            const personalities = [];

            const speciesData = await this.villager.createQueryBuilder("villager")
                .select('villager.species')
                .groupBy("villager.species")
                .getRawMany();
            
            const personalitiesData = await this.villager.createQueryBuilder("villager")
                .select('villager.personality')
                .groupBy("villager.personality")
                .getRawMany();
            
            speciesData.map((item) => {
                species.push(item.villager_species);
            });

            personalitiesData.map((item) => {
                personalities.push(item.villager_personality);
            });

            return {
                ok: true,
                species,
                personalities
            };
        } catch (error) {
            console.log(error);
            return { ok: false, error };
        }
    }

    async createVillagers(villagerInput: CreateVillagersInput):Promise<CreateVillagersOutput> {
        try {
            const findedVillager = await this.villager.findOne({ where: { name: villagerInput.name } });
            if (!findedVillager) { return; }

            // await this.villager.save(this.villager.create(villagerInput));
            await this.villager.update(findedVillager.id, { icon: villagerInput.icon });

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }
    
    async villagerComments({ villagerId, page }: VillagerCommentsInput): Promise<VillagerCommentsOutput> {
        try {
            const count = 20;
            const villager = await this.villager.findOneBy({ id: villagerId });

            if (!villager) {
                return { ok: false, error: "Villager Not Found." };
            }
            
            const comments = await this.villagerComment.find({
                relations: ['user'],
                where: {
                    villagerId
                },
                skip: page * count,
                take: count
            });

            return { ok: true, comments };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async createVillagerComment(user, { content, villagerId }: CreateVillagerCommentInput): Promise<CreateVillagerCommentOutput> {
        try {
            const villager = await this.villager.findOneBy({ id: villagerId });
            if (!villager) {
                return { ok: false, error: "Villager Not Found." };
            }

            await this.villagerComment.save(this.villagerComment.create({ content, villager, user }));
            
            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async deleteVillagerComment(userId: number, {id}: DeleteVillagerCommentInput): Promise<DeleteVillagerCommentOutput> {
        try {
            const comment = await this.villagerComment.findOne({ where: {id}, relations: ["user"] });
            
            if (!comment) {
                return { ok: false, error: "Comment Not Found." };
            }
            if (userId !== comment.user.id) {
                return { ok: false, error: "Permission denied." };
            }
            
            await this.villagerComment.delete({ id });

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }
}