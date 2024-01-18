import { ObjectType, Field, Int } from "type-graphql";
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity()
export class Questions extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    questionhash!: string

    @Field(() => String)
    @Column()
    film: string

    @Field(() => String)
    @Column()
    filmImg!: string

    @Field(() => String)
    @Column()
    acteur!: string

    @Field(() => String)
    @Column()
    acteurImg!: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
    
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

}