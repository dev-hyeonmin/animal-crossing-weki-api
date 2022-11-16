import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Fish } from './entities/fish.entity';
import { FishResolver } from './fishes.resolver';
import { FishService } from './fishes.service';

@Module({})
@Module({
    imports: [TypeOrmModule.forFeature([Fish, User])],
    providers: [FishResolver, FishService],
    exports: [FishService]
})
export class FishesModule {}
