import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as bcrypt from 'bcryptjs'

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<User | null> {

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return null
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return null
    }

    return user
  }
}