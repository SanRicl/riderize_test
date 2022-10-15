/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Ride } from '../schemas/Ride';
import { Context } from '../context';

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
  additional_information: string | null;

  @Field(type => String, { nullable: false })
  start_place: string;

  @Field(type => Number, { nullable: true })
  participants_limit: number | null;
}

@Resolver(Ride)
export class RideResolver {
  @Mutation(() => Ride)
  async createRide(
    @Arg('data') data: RideInputData,
    @Ctx() ctx: Context,
  ): Promise<Ride> {
    return await ctx.prisma.ride.create({
      data,
    });
  }
}
