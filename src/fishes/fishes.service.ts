import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateFishInput, CreateFishOutput, DeleteFishInput, DeleteFishOutput, UserFishOutput } from "./dtos/fish.dto";
import { Fish } from "./entities/fish.entity";

@Injectable()
export class FishService {
    constructor(
        @InjectRepository(Fish)
        private readonly fishes: Repository<Fish>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) { }

    async userFishes(userId: number): Promise<UserFishOutput> {
        try {
            const user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['fishes']
            });

            return { ok: true, fishes: user.fishes };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async createFishRelation(userId: number, { name }: CreateFishInput): Promise<CreateFishOutput> {
        try {
            let user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['fishes']
            });
            let fish = await this.fishes.findOne({ where: { name } });

            if (!fish) {
                fish = await this.fishes.save(this.fishes.create({ name }));
            }

            user.fishes.push(fish);
            await this.users.save(user);

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async deleteFishRelation(userId: number, { name }: DeleteFishInput): Promise<DeleteFishOutput> {
        try {
            let user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['fishes']
            });
            
            user.fishes = user.fishes.filter((fish) => fish.name !== name);
            await this.users.save(user);

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }
}