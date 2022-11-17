import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatureResolver } from '../creatures/creatures.resolver';
import { CreatureService } from '../creatures/creatures.service';
import { Creature } from '../creatures/entities/creature.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Creature, User])],
    providers: [CreatureResolver, CreatureService],
    exports: [CreatureService]
})
export class CreaturesModule {}
