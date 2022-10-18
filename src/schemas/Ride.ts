/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';
import { IsDate } from 'class-validator';

@ObjectType()
export class Ride {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field(type => String, { nullable: false })
  name: string;

  @Field(type => Date, { nullable: false })
  @IsDate()
  start_date: Date;

  @Field(type => Date, { nullable: false })
  @IsDate()
  start_date_registration: Date;

  @Field(type => Date, { nullable: false })
  @IsDate()
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
