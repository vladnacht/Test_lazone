import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class UserInput {

  @Field(() => String)
  @Length(1, 255)
  username!: string;


  @Field(() => String)
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already used" })
  email!: string;


  @Field(() => String)
  password!: string;
}
