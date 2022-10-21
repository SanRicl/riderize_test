import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { Ride } from '../schemas/Ride';
import { Context } from '../context';
import { User } from '../schemas/User';
import { RideInputData } from './InputTypes/InputTypes';
import { redisClient } from '../config/redis';

@Resolver(Ride)
export class RideResolver {
  @Authorized()
  @Mutation(() => Ride)
  async createRide(
    @Arg('data') data: RideInputData,
    @Ctx() ctx: Context,
  ): Promise<Ride> {
    if (!data.name || !data.start_place || !data.userId)
      throw new Error('Missing data!');

    const user = await ctx.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) throw new Error('User does not exists.');

    const newRide = await ctx.prisma.ride.create({
      data,
    });
    await redisClient.del('rides');

    return newRide;
  }

  @FieldResolver(() => User)
  async user(@Root() ride: Ride, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ride.userId },
    });
    return user;
  }
}
