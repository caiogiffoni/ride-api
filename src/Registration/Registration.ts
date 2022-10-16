import { Field, ObjectType, ID, InputType } from "type-graphql";

@ObjectType()
export class Registration {
  @Field((type) => ID)
  id: string;

  @Field((type) => Date)
  subscription_date: Date;

  @Field((type) => String)
  userId: String;

  @Field((type) => String)
  rideId: String;
}
