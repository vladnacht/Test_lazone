import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";
import * as bcrypt from 'bcryptjs'

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("input") {email, username, firstName, lastName, password}: UserInput): Promise<User | undefined> {

    const check = await User.findOne({ where: { username } })

    if (check) {
      throw new Error("username already exist")
    }

    const unique_email = await User.findOne({ where: { email } })

    if (unique_email) {
      throw new Error("email already exist")
    }

    const hanshedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
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
