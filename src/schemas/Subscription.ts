/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';
import { IsDate } from 'class-validator';

@ObjectType()
export class User {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field({ nullable: false })
  ride_id: number;

  @Field(type => String, { nullable: false })
  user_id: string;

  @Field(type => Date)
  @IsDate()
  subscription_date: Date;
}
