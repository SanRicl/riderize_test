/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Subscription {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field(type => Number, { nullable: false })
  ride_id: number;

  @Field(type => Number, { nullable: false })
  user_id: number;

  @Field(type => Date)
  subscription_date: Date;
}
