/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

export interface IUser {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

interface IAuth {
  token: string;
  user: IUser;
}

@ObjectType()
class Auth implements IAuth {
  @Field({ nullable: false })
  token: string;

  @Field(type => User, { nullable: false })
  user: User;
}

export default Auth;
