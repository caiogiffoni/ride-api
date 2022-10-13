import { IsEmail, isEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UserInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
