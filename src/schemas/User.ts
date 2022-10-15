/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field(type => String, { nullable: false })
  password: string;

  @Field(type => Date)
  created_at: Date;
}
