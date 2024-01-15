import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as bcrypt from 'bcryptjs'
import { UserLogin } from "../types";

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(@Arg("input") { username, password }: UserLogin): Promise<User | null> {

    const user = await User.findOne({ where: { username } })

    if (!user) {
        throw new Error("Invalid username")
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        throw new Error("Invalid password")
    }

    return user
  }
}