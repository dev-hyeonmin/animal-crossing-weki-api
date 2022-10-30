import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Villager } from './entities/villager';
import { VillagersResolver } from './villagers.resolver';
import { VillagersService } from './villagers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Villager])],
    providers: [VillagersResolver, VillagersService],
})
export class VillagersModule {}
