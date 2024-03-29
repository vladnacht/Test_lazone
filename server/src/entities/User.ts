import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  username!: string;

  
  @Field(() => String)
  @Column("text", { unique: true })
  email!: string;
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  firstName!: string; 

  @Field(() => String)
  @Column()
  lastName!: string
  
  @Field(() => String)
  @Column()
  password!: string;

}
