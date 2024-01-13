import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";
import * as bcrypt from 'bcryptjs'

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("data") {email, username, password}: UserInput): Promise<User | undefined> {
    const hanshedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      password: hanshedPassword 
    }).save()

    return user
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
