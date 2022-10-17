/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';
import { IsDate } from 'class-validator';

export interface IRide {
  id: number;
  name: string;
  start_date: string;
  start_date_registration: string;
  end_date_registration: Date;
  additional_information: string | null;
  start_place: string;
  participants_limit: string | null;
  userId: number;
}

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
  additional_information: string | null;

  @Field(type => String, { nullable: false })
  start_place: string;

  @Field(type => Number, { nullable: true })
  participants_limit: number | null;

  @Field(type => Number, { nullable: false })
  userId: number;
}
