import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {

  @Field(() => String)
  @Length(1, 255)
  username!: string;


  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @Length(1, 255)
  firstName!: string;

  @Field(() => String)
  @Length(1, 255)
  lastName!: string;


  @Field(() => String)
  password!: string;
}

@InputType()
export class UserLogin {

  @Field(() => String)
  @Length(1, 255)
  username!: string;

  @Field(() => String)
  password!: string;

}
