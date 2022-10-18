/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsDate } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RideInputData {
  @Field(type => String, { nullable: false })
  name: string;

  @Field(type => Date, { nullable: false })
  start_date: Date;

  @Field(type => Date, { nullable: false })
  start_date_registration: Date;

  @Field(type => Date, { nullable: false })
  end_date_registration: Date;

  @Field(type => String, { nullable: true })
  additional_information: string;

  @Field(type => String, { nullable: false })
  start_place: string;

  @Field(type => Number, { nullable: true })
  participants_limit: number;

  @Field(type => Number, { nullable: false })
  userId: number;
}

@InputType()
export class SubscriptionInputData {
  @Field(type => Number, { nullable: false })
  ride_id: number;

  @Field(type => Number, { nullable: false })
  user_id: number;

  @Field(type => Date, { nullable: false })
  subscription_date: Date;
}

@InputType()
export class UserInputData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
