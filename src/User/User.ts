import { Field, ObjectType, ID, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => Date)
  createdAt: Date;
}

@ObjectType()
export class ReturnUser {
  @Field((type) => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => Date)
  createdAt: Date;
}

@InputType()
export class UserInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserWithToken {
  @Field()
  user: User;

  @Field()
  token: string;
}
