import { Field, ObjectType, ID, InputType } from "type-graphql";

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

}



@InputType()
export class RideInputData {
  @Field()
  name: string;

  @Field()
  start_date: Date;

  @Field()
  start_date_registration: Date;

  @Field()
  end_date_registration: Date;

  @Field()
  additional_information: string;

  @Field()
  start_place: string;

  @Field()
  participants_limit: number;
}
