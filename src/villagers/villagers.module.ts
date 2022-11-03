import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Villager } from './entities/villager';
import { VillagerComment } from './entities/villager-comment';
import { VillagersResolver } from './villagers.resolver';
import { VillagersService } from './villagers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Villager, VillagerComment])],
    providers: [VillagersResolver, VillagersService],
})
export class VillagersModule {}
