import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateCreatureInput, CreateCreatureOutput, DeleteCreatureInput, DeleteCreatureOutput, UserCreatureOutput } from "./dtos/creature.dto";
import { Creature } from "./entities/creature.entity";

@Injectable()
export class CreatureService {
    constructor(
        @InjectRepository(Creature)
        private readonly creatures: Repository<Creature>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) { }

    async userCreatures(userId: number): Promise<UserCreatureOutput> {
        try {
            const user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['creatures']
            });

            return { ok: true, creatures: user.creatures };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async createCreatureRelation(userId: number, { name }: CreateCreatureInput): Promise<CreateCreatureOutput> {
        try {
            let user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['creatures']
            });
            let creature = await this.creatures.findOne({ where: { name } });

            if (!creature) {
                creature = await this.creatures.save(this.creatures.create({ name }));
            }

            user.creatures.push(creature);
            await this.users.save(user);

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }

    async deleteCreatureRelation(userId: number, { name }: DeleteCreatureInput): Promise<DeleteCreatureOutput> {
        try {
            let user = await this.users.findOne({
                where: {
                    id: userId
                },
                relations: ['Creatures']
            });
            
            user.creatures = user.creatures.filter((creature) => creature.name !== name);
            await this.users.save(user);

            return { ok: true };
        } catch (error) {
            return { ok: false, error };
        }
    }
}