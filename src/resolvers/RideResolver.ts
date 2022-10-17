/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Ride } from '../schemas/Ride';
import { Context } from '../context';
import { User } from '../schemas/User';

@InputType()
class RideInputData {
  @Field(type => ID, { nullable: false })
  id: number;

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

  @Field(type => Number, { nullable: false })
  userId: number;
}

@Resolver(Ride)
export class RideResolver {
  @Authorized()
  @Query(() => [Ride])
  async getRides(@Ctx() ctx: Context): Promise<Ride[]> {
    const rides = await ctx.prisma.ride.findMany({
      select: {
        id: true,
        name: true,
        additional_information: true,
        created_at: true,
        end_date_registration: true,
        start_date: true,
        start_date_registration: true,
        participants_limit: true,
        start_place: true,
        userId: true,
      },
    });
    return rides;
  }

  @Mutation(() => Ride)
  async createRide(
    @Arg('data') data: RideInputData,
    @Ctx() ctx: Context,
  ): Promise<Ride> {
    return await ctx.prisma.ride.create({
      data,
    });
  }

  @FieldResolver(() => User)
  async user(@Root() ride: Ride, @Ctx() ctx: Context) {
    // console.log(ride);
    const user = await ctx.prisma.user.findUnique({
      where: { id: ride.userId },
    });
    return user;
  }
}
