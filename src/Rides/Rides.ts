import { Field, ObjectType, ID, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class Rides {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Date)
  start_date: Date;

  @Field((type) => Date)
  start_date_registration: Date;

  @Field((type) => Date)
  end_date_registration: Date;

  @Field((type) => String)
  additional_information: string;

  @Field((type) => String)
  start_place: string;

  @Field((type) => Number)
  participants_limit: number;

  @Field((type) => String)
  userId: String;

  // @Field({ nullable: true })
  // registration: String;
}

// @ObjectType()
// export class ReturnUser {
//   @Field((type) => ID)
//   id: string;

//   @Field()
//   @IsEmail()
//   email: string;

//   @Field((type) => Date)
//   createdAt: Date;
// }

// @InputType()
// export class UserInputData {
//   @Field()
//   @IsEmail()
//   email: string;

//   @Field()
//   password: string;
// }

// @ObjectType()
// export class UserWithToken {
//   @Field()
//   user: User;

//   @Field()
//   token: string;
// }
