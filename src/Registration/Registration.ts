import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Rides } from "../Rides/Rides";

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

@ObjectType()
export class RegistrationRide {
  @Field((type) => ID)
  id: string;

  @Field((type) => Date)
  subscription_date: Date;

  @Field((type) => String)
  userId: String;

  @Field((type) => String)
  rideId: String;

  @Field((type) => Rides)
  ride: Rides;
}
