import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, UpdateDateColumn } from "typeorm";
import { VillagerComment } from "src/villagers/entities/villager-comment";
import { Creature } from "src/creatures/entities/creature.entity";
import { Villager } from "src/villagers/entities/villager";

@InputType("UserInputType", { isAbstract: true })
@ObjectType() // 자동으로 스키마를 빌드하기 위한 GraphQL의 decorator
@Entity() // TypeORM이 DB에 해당 정보 저장
export class User extends CoreEntity {
    @Column()
    @Field(type => String)
    name: string;

    @Column({ unique: true })
    @Field(type => String)
    email: string;

    @Column()
    @Field(type => String)
    password: string;

    @Column({ nullable: true })
    @Field(type => String, { nullable: true })
    userImage?: string;

    @Column({ nullable: true, comment: "섬이름" })
    @Field(type => String, { nullable: true })
    islandName?: string;

    @Column({ nullable: true, comment: "꿈번지" })
    @Field(type => String, { nullable: true })
    islandCode?: string;

    @Column({ default: false })
    @Field(type => Boolean)
    verified: boolean;

    @UpdateDateColumn()
    @Field(type => Date)
    lastLogin: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException;
            }
        }
    }

    @OneToMany(
        () => VillagerComment,
        (comment) => comment.user,
        { onDelete: "CASCADE", nullable: true },
    )
    comments?: VillagerComment[];

    @Field(type => [Creature])
    @ManyToMany(type => Creature)
    @JoinTable()
    creatures: Creature[];

    @Field(type => [Villager])
    @ManyToMany(type => Villager)
    @JoinTable()
    favorites: Villager[];
}